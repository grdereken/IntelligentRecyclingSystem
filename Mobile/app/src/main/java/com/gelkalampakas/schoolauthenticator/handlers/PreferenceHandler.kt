package com.gelkalampakas.schoolauthenticator.handlers

import android.content.Context
import android.content.SharedPreferences
import com.gelkalampakas.schoolauthenticator.models.LoginData

class PreferenceHandler(private val context: Context) {

    fun setLoginData(loginData: LoginData) {
        val sharedPreferences: SharedPreferences = context.getSharedPreferences("loginData", Context.MODE_PRIVATE)
        val editor: SharedPreferences.Editor = sharedPreferences.edit()

        editor.putString("username", loginData.username)
        editor.putString("password", loginData.password)
        editor.apply()
    }

    fun getLoginData(): LoginData {
        val sharedPreferences: SharedPreferences = context.getSharedPreferences("loginData", Context.MODE_PRIVATE)

        val username = sharedPreferences.getString("username", "").toString()
        val password = sharedPreferences.getString("password", "").toString()

        return LoginData(username, password)
    }

    fun setIP(ip: String) {
        val sharedPreferences: SharedPreferences = context.getSharedPreferences("connection", Context.MODE_PRIVATE)
        val editor: SharedPreferences.Editor = sharedPreferences.edit()

        editor.putString("ip", ip)
        editor.apply()
    }

    fun getIP(): String {
        val sharedPreferences: SharedPreferences = context.getSharedPreferences("connection", Context.MODE_PRIVATE)

        val ip = sharedPreferences.getString("ip", "192.168.1.253").toString()

        return ip
    }
}