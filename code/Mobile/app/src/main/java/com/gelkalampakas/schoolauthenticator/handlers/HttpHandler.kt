package com.gelkalampakas.schoolauthenticator.handlers

import android.content.Context
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.gelkalampakas.schoolauthenticator.models.LoginData

class HttpHandler(private val context: Context) {
    var preferenceHandler: PreferenceHandler = PreferenceHandler(context)

    val queue = Volley.newRequestQueue(context)
    fun getRequest(url: String, funToCall: (input: String) -> Any, errorFunToCall: (input: String) -> Any) {
        val fullUrl = "http://" + preferenceHandler.getIP() + url
        val stringRequest = StringRequest(Request.Method.GET, fullUrl,
            { response ->
                funToCall(response.toString())
            },
            { error -> errorFunToCall(error.toString())})

        queue.add(stringRequest)
    }

    fun getRequestWithLoginData(url: String, loginData: LoginData, funToCall: (input: String) -> Any, errorFunToCall: (input: String) -> Any) {
        val username = loginData.username
        val password = loginData.password

        val urlWithLoginData = url + String.format("?username=%s&password=%s", username, password)
        getRequest(urlWithLoginData, funToCall, errorFunToCall)
    }
}