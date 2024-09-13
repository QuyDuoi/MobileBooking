export function isValidDate(dateString) {
    // Biểu thức regex kiểm tra định dạng ngày (dd/mm/yyyy hoặc dd-mm-yyyy)
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  
    // Kiểm tra nếu chuỗi khớp với định dạng dd/mm/yyyy hoặc dd-mm-yyyy
    if (!dateRegex.test(dateString)) {
      return false;
    }
  
    // Tách ngày, tháng, năm từ chuỗi
    const parts = dateString.split(/[/\-]/);
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
  
    // Kiểm tra tính hợp lệ của ngày
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  }
  
export function isPhoneNumber(phoneNumber) {
    // Biểu thức regex kiểm tra số điện thoại
    const phoneRegex = /^(?:\+?\d{1,3})?[ -]?\(?\d{1,4}\)?[ -]?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,9}$/;
  
    // Kiểm tra nếu phoneNumber khớp với regex
    return phoneRegex.test(phoneNumber);
  }