function check_captcha(r) {
    const cookie = r.headersIn.Cookie || '';
    
    // Проверяем наличие куки captcha_ok=1
    if (cookie.includes('captcha_ok=1')) {
        return '1'; // Капча пройдена
    }
    
    return '0'; // Капча не пройдена
}

export default { check_captcha };
