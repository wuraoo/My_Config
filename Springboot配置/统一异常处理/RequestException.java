package com.zjj.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * 统一异常处理类
 */
@ControllerAdvice
public class RequestException {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e){
        return ResponseEntity.status(500).body(e.getMessage());
    }

    /***
     * 自定义异常处理
     */
    @ExceptionHandler(MsException.class)
    public ResponseEntity exceptionResult(MsException e){
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

}
