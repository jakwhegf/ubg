(function() {
    // 1. Chuỗi Base64 từ file XML ở Bước 2
    var ENCODED_XML = "PE1vZHVsZT4KPENvbnRlbnQgdHlwZT0iaHRtbCI+PCFbQ0RBVEFbCjxzY3JpcHQ+CihmdW5jdGlvbigpIHsKICAgIHZhciBHQU1FX0lEID0gIm1vdG94M20yIjsgLy8gVGhheSBi4bqxbmcgSUQgZ2FtZSB0xrDGoW5nIOG7qW5nCiAgICB2YXIgR0FTXzFfVVJMID0gImh0dHBzOi8vc2NyaXB0Lmdvb2dsZS5jb20vbWFjcm9zL3MvQUtmeWNieVRTdGRsalBmY3A1Rm9xNG9NQmpKeHJwSlg1Nm1yN3lBRUNBNFB4a1lCMHlFZjJSQ25Xd0M1N3BlakN3ZmNCQS9leGVjIjsgLy8gPC0tLSBUSEFZIExJTksgR0FTIDEgVsOATyDEkMOCWQogICAgCiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImdhbWUtY29udGFpbmVyIikgfHwgZG9jdW1lbnQuYm9keTsKICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpZnJhbWUiKTsKICAgIGlmcmFtZS5zcmMgPSBHQVNfMV9VUkwgKyAiP2lkPSIgKyBHQU1FX0lEOwogICAgaWZyYW1lLnN0eWxlLmNzc1RleHQgPSAid2lkdGg6MTAwJTsgaGVpZ2h0OjEwMHZoOyBib3JkZXI6bm9uZTsgb3ZlcmZsb3c6aGlkZGVuOyI7CiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCJhbGxvdyIsICJmdWxsc2NyZWVuOyBhdXRvcGxheTsgZ2FtZXBhZCIpOwogICAgCiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gIiI7IC8vIFjDs2EgbuG7mWkgZHVuZyBjxakKICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpZnJhbWUpOwp9KSgpOwo8L3NjcmlwdD4KXV0+PC9Db250ZW50Pgo8L01vZHVsZT4=
"; 

    try {
        // 2. Giải mã XML
        var decoded = decodeURIComponent(escape(atob(ENCODED_XML)));
        
        // 3. Trích xuất code JS bên trong thẻ <script> để chạy
        var scriptMatch = decoded.match(/<script>([\s\S]*?)<\/script>/i);
        if (scriptMatch && scriptMatch[1]) {
            var fn = new Function(scriptMatch[1]);
            fn();
        }
    } catch (e) {
        console.error("Lỗi nhúng game:", e);
    }
})();
