package com.gelkalampakas.schoolauthenticator.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import com.gelkalampakas.schoolauthenticator.R
import com.gelkalampakas.schoolauthenticator.handlers.*

class MainActivity : AppCompatActivity() {
    private lateinit var httpHandler: HttpHandler
    private lateinit var preferenceHandler: PreferenceHandler

    private lateinit var toolbar: Toolbar

    private lateinit var setActiveUserButton: Button
    private lateinit var loginAgainButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        httpHandler = HttpHandler(this)
        preferenceHandler = PreferenceHandler(this)

        forceLogin()

        toolbar = findViewById(R.id.mainActivityToolbar)
        toolbar.setOnMenuItemClickListener { toolbarHandler(this, it) }

        setActiveUserButton = findViewById(R.id.setActiveUserButton)
        setActiveUserButton.setOnClickListener {setActiveUser()}

        loginAgainButton = findViewById(R.id.loginAgainButton)
        loginAgainButton.setOnClickListener {switchToLoginActivity()}
    }

    private fun setActiveUser() {
        val loginData = preferenceHandler.getLoginData()

        val url = "/setActiveUser/"
        httpHandler.getRequest(url, loginData, ::showRequestSuccessToast, ::showRequestFailureToast)
    }

    // If preferences not set, force a login
    private fun forceLogin() {
        if(!preferenceHandler.getLoginData().isValid()) switchToLoginActivity()
    }

    private fun switchToLoginActivity() {
        val intent = Intent(this, LoginActivity::class.java)

        startActivity(intent)
        finish()
    }

    private fun showRequestSuccessToast(activeUserChanged: Boolean) {
        //if(!activeUserChanged) return

        val toast = Toast.makeText(this, "Success, you can now use the device", Toast.LENGTH_LONG)
        toast.show()
    }

    private fun showRequestFailureToast(error: String) {
        val toast = Toast.makeText(applicationContext, error, Toast.LENGTH_LONG)
        toast.show()
    }
}