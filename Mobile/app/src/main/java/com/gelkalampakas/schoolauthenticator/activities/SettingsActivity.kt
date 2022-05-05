package com.gelkalampakas.schoolauthenticator.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.EditText
import androidx.core.widget.doAfterTextChanged
import com.gelkalampakas.schoolauthenticator.R
import com.gelkalampakas.schoolauthenticator.handlers.PreferenceHandler

class SettingsActivity : AppCompatActivity() {
    lateinit var prefrenceHandler: PreferenceHandler

    lateinit var ipView: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        prefrenceHandler = PreferenceHandler(this)

        ipView = findViewById(R.id.editTextIP)
        ipView.setText(prefrenceHandler.getIP())

        ipView.doAfterTextChanged { prefrenceHandler.setIP(it.toString()) }

        setSupportActionBar(findViewById(R.id.settingsActivityToolbar))
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }
}