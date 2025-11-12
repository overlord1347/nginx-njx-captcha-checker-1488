function check_captcha(r) {
    const cookie = r.headersIn.Cookie || '';
    r.log('DEBUG cookie: ' + cookie);

    const m = cookie.match(/captcha_token=([^;]+)/);
    if (!m) {
        return '0';
    }

    const token = m[1];

    // составляем тело запроса и используем синхронный subrequest
    const body = 'secret=6LegAQosAAAAAN2-RL9enBpabelNdRELNZeeqYHd&response=' + encodeURIComponent(token);

    // внутренний location = /_verify_captcha проксирует на Google
    const res = r.subrequest('/_verify_captcha', {
        method: 'POST',
        body: body,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    r.log('DEBUG verify status: ' + res.status);
    r.log('DEBUG verify body: ' + (res.responseBody || '').slice(0, 200));

    if (res.status === 200 && res.responseBody && res.responseBody.indexOf('"success": true') !== -1) {
        return '1';
    }

    return '0';
}

export default { check_captcha };
