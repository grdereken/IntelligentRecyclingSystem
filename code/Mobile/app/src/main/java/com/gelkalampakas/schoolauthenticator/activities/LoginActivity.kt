package com.gelkalampakas.schoolauthenticator.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import com.gelkalampakas.schoolauthenticator.R
import com.gelkalampakas.schoolauthenticator.handlers.*
import com.gelkalampakas.schoolauthenticator.models.LoginData

class LoginActivity : AppCompatActivity() {
    private lateinit var preferenceHandler: PreferenceHandler
    private lateinit var httpHandler: HttpHandler


    private lateinit var toolbar: Toolbar

    private lateinit var nameView: EditText
    private lateinit var passwordView: EditText

    private lateinit var loginButton: Button
    private lateinit var invalidLoginView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        preferenceHandler = PreferenceHandler(this)
        httpHandler = HttpHandler(this)

        toolbar = findViewById(R.id.loginActivityToolbar)
        toolbar.setOnMenuItemClickListener { toolbarHandler(this, it) }

        nameView = findViewById(R.id.editTextName)
        passwordView = findViewById(R.id.editTextPassword)

        loginButton = findViewById(R.id.loginButton)
        loginButton.setOnClickListener {callLoginHandler()}

        invalidLoginView = findViewById(R.id.invalidLoginView)

    }

    private lateinit var tempName: String
    private lateinit var tempPassword: String
    private fun loginHandler(response: String) {
        val isLoginValid = response.toBoolean()

        setInvalidLoginViewVisibility(isLoginValid)

        preferenceHandler.setLoginData(LoginData(tempName, tempPassword))

        if(isLoginValid) switchToMainActivity()
    }

    // Sends async request to check if user exists
    private fun callLoginHandler() {
        val url = "/isLoginDataValid/"
        tempName = nameView.text.toString()
        tempPassword = passwordView.text.toString()

        httpHandler.getRequestWithLoginData(url, LoginData(tempName, tempPassword), ::loginHandler, ::showRequestFailureToast)
    }

    private fun switchToMainActivity(){
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
    }

    private fun setInvalidLoginViewVisibility(isLoginValid: Boolean){
        invalidLoginView.visibility = if(isLoginValid) View.INVISIBLE else View.VISIBLE
    }

    private fun showRequestFailureToast(error: String) {
        val toast = Toast.makeText(this, error, Toast.LENGTH_LONG)
        toast.show()
    }
}