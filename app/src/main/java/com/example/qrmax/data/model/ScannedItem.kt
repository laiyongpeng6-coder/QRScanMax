package com.example.qrmax.data.model

data class ScannedItem(
    val id: String,
    val type: String,
    val content: String,
    val timestamp: Long,
    val details: Map<String, String> = emptyMap()
)
