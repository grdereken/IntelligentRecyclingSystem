package com.gelkalampakas.schoolauthenticator.activities

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.gelkalampakas.schoolauthenticator.R
import com.gelkalampakas.schoolauthenticator.handlers.*

class MainActivity : AppCompatActivity() {
    private lateinit var httpHandler: HttpHandler
    private lateinit var preferenceHandler: PreferenceHandler

    private lateinit var toolbar: Toolbar

    private lateinit var activeUserView: TextView

    private lateinit var setActiveUserButton: Button
    private lateinit var loginAgainButton: Button

    private var activeUser = ""
    private var activeUserPoints = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        httpHandler = HttpHandler(this)
        preferenceHandler = PreferenceHandler(this)

        forceLogin()

        toolbar = findViewById(R.id.mainActivityToolbar)
        toolbar.setOnMenuItemClickListener { toolbarHandler(this, it) }

        activeUserView = findViewById(R.id.activeUserView)

        setActiveUserButton = findViewById(R.id.setActiveUserButton)
        setActiveUserButton.setOnClickListener {setActiveUser()}

        loginAgainButton = findViewById(R.id.loginAgainButton)
        loginAgainButton.setOnClickListener {switchToLoginActivity()}

        setupUserPoll()
    }

    private fun setActiveUser() {
        val loginData = preferenceHandler.getLoginData()

        val url = "/setActiveUser/"
        httpHandler.getRequestWithLoginData(url, loginData, ::showRequestSuccessToast, ::showRequestFailureToast)
    }

    // If preferences are not set, force a login
    private fun forceLogin() {
        if(!preferenceHandler.getLoginData().isValid()) switchToLoginActivity()
    }

    private fun switchToLoginActivity() {
        val intent = Intent(this, LoginActivity::class.java)

        startActivity(intent)
        finish()
    }

    private fun showRequestSuccessToast(activeUserChanged: String) {
        val toast = Toast.makeText(this, "Success, you can now use the device", Toast.LENGTH_LONG)
        toast.show()
    }

    private fun showRequestFailureToast(error: String) {
        val toast = Toast.makeText(applicationContext, error, Toast.LENGTH_LONG)
        toast.show()
    }

    private fun sendGetRequests() {
        var url = "/getActiveUser/"
        httpHandler.getRequest(url, ::getActiveUser, ::showRequestFailureToast)

        url = "/getPoints/"
        httpHandler.getRequest(url, ::getPoints, ::showRequestFailureToast)
    }

    private fun setupUserPoll() {
        val mainHandler = Handler(Looper.getMainLooper())

        mainHandler.post(object : Runnable {
            override fun run() {
                sendGetRequests()
                mainHandler.postDelayed(this, 3000)
            }
        })
    }

    private fun updateActiveUser() {
        val newText = String.format("Active User: %s\nPoints: %s", activeUser, activeUserPoints)
        activeUserView.setText(newText)
    }

    private fun getActiveUser(newActiveUser: String) {
        activeUser = newActiveUser
        updateActiveUser()
    }

    private fun getPoints(newPoints: String) {
        activeUserPoints = newPoints
        updateActiveUser()
    }
}