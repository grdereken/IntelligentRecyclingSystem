package com.gelkalampakas.schoolauthenticator.handlers

import android.content.Context
import android.content.Intent
import android.view.MenuItem
import com.gelkalampakas.schoolauthenticator.R
import com.gelkalampakas.schoolauthenticator.activities.SettingsActivity


fun toolbarHandler(context: Context, item: MenuItem): Boolean {
    if (item.itemId != R.id.action_settings) return false

    val intent = Intent(context, SettingsActivity::class.java)
    context.startActivity(intent)

    return true
}
