package com.gelkalampakas.schoolauthenticator.handlers

import android.content.Context
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.gelkalampakas.schoolauthenticator.models.LoginData

class HttpHandler(private val context: Context) {
    var preferenceHandler: PreferenceHandler = PreferenceHandler(context)

    fun getRequest(url: String, loginData: LoginData, funToCall: (input: Boolean) -> Any, errorFunToCall: (input: String) -> Any) {
        val queue = Volley.newRequestQueue(context)


        val username = loginData.username
        val password = loginData.password
        val fullUrl = "http://" + preferenceHandler.getIP() + url + String.format("?username=%s&password=%s", username, password)

        val stringRequest = StringRequest(Request.Method.GET, fullUrl,
            { response ->
                funToCall(response.toString().toBoolean())
            },
            { error -> errorFunToCall(error.toString())})

        queue.add(stringRequest)
    }
}