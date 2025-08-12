/**
 * Google Apps Script để kết nối React app với Google Sheets
 * 
 * Hướng dẫn setup:
 * 1. Truy cập https://script.google.com/
 * 2. Tạo project mới
 * 3. Copy code này vào Code.gs
 * 4. Thay đổi SHEET_ID thành ID của Google Sheet của bạn
 * 5. Deploy as Web App với quyền "Anyone" có thể execute
 * 6. Copy URL của Web App và thay thế trong Guestbook.js
 */

// ID của Google Sheet - thay thế bằng ID thực tế
const SHEET_ID = '12pUSOXZT1j5Y0PewAHlAAfsSOcQalALrH287cQq4-fs';
const SHEET_NAME = 'Sheet1'; // Tên sheet, có thể thay đổi nếu cần

/**
 * Tạo response với CORS headers
 */
function createCORSResponse(data) {
  const output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
    
  // Thêm CORS headers
  output.setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600'
  });
  
  return output;
}

/**
 * Xử lý OPTIONS request cho CORS preflight
 */
function doOptions(e) {
  return createCORSResponse({
    success: true,
    message: 'CORS preflight successful'
  });
}

/**
 * Xử lý GET request - đọc dữ liệu từ Google Sheets
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'read') {
      return readGuestMessages();
    }
    
    return createCORSResponse({
      success: false,
      error: 'Invalid action'
    });
      
  } catch (error) {
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Xử lý POST request - ghi dữ liệu vào Google Sheets
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'write') {
      return writeGuestMessage(data);
    }
    
    return createCORSResponse({
      success: false,
      error: 'Invalid action'
    });
      
  } catch (error) {
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Đọc tất cả lời chúc từ Google Sheets
 */
function readGuestMessages() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // Bỏ qua header row (row đầu tiên)
    const messages = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Kiểm tra nếu row có dữ liệu
      if (row[0] && row[1]) {
        messages.push({
          id: i,
          name: row[0],        // Cột A: name
          content: row[1],     // Cột B: content
          show: row[2] === true || row[2] === 'TRUE' || row[2] === 'true', // Cột C: show
          timestamp: row[3] || new Date().toISOString().split('T')[0] // Cột D: timestamp
        });
      }
    }
    
    return createCORSResponse({
      success: true,
      messages: messages
    });
      
  } catch (error) {
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Ghi lời chúc mới vào Google Sheets
 */
function writeGuestMessage(data) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Thêm header nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['name', 'content', 'show', 'timestamp']);
    }
    
    // Thêm dữ liệu mới
    const timestamp = new Date().toISOString().split('T')[0];
    sheet.appendRow([
      data.name,
      data.content,
      data.show || false, // Mặc định là false, admin sẽ approve sau
      timestamp
    ]);
    
    return createCORSResponse({
      success: true,
      message: 'Guest message saved successfully'
    });
      
  } catch (error) {
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Hàm test để kiểm tra kết nối
 */
function testConnection() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    Logger.log('Connection successful!');
    Logger.log('Sheet name: ' + sheet.getName());
    Logger.log('Last row: ' + sheet.getLastRow());
    return true;
  } catch (error) {
    Logger.log('Connection failed: ' + error.toString());
    return false;
  }
}
