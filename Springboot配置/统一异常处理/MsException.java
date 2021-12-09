package com.zjj.exception;

import lombok.Data;

@Data
    public class MsException extends RuntimeException {
        // 异常状态码
        private Integer status;

    public MsException(Integer status) {
        this.status = status;
    }

    public MsException(String message) {
        super(message);
    }

    public MsException(
            Integer status, String message) {
        super(message);
        this.status = status;
    }

}
