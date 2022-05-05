package com.gelkalampakas.schoolauthenticator.models

class LoginData(val username: String, val password: String) {
    fun isValid(): Boolean {
        return username != ""
    }
}