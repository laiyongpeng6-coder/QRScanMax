package com.example.qrmax.data.parser

object QRParser {
    fun parse(data: String): ParsedResult {
        val type: String
        val details = mutableMapOf<String, String>()

        when {
            Regex("^(http|https)://[^ ]+$").matches(data) -> {
                type = if (data.contains("instagram.com") || data.contains("forms.gle")) "social" else "url"
            }
            data.startsWith("WIFI:", ignoreCase = true) -> {
                type = "wifi"
                val sMatch = Regex("S:([^;]+)").find(data)
                val pMatch = Regex("P:([^;]+)").find(data)
                details["ssid"] = sMatch?.groupValues?.get(1) ?: "Unknown"
                details["password"] = pMatch?.groupValues?.get(1) ?: ""
            }
            data.uppercase().startsWith("BEGIN:VCARD") -> {
                type = "vcard"
                val nameMatch = Regex("FN:(.+)", RegexOption.IGNORE_CASE).find(data)
                val orgMatch = Regex("ORG:(.+)", RegexOption.IGNORE_CASE).find(data)
                val telMatch = Regex("TEL.*:(.+)", RegexOption.IGNORE_CASE).find(data)
                details["name"] = nameMatch?.groupValues?.get(1)?.trim() ?: "Contact"
                details["org"] = orgMatch?.groupValues?.get(1)?.trim() ?: "Unknown Org"
                details["tel"] = telMatch?.groupValues?.get(1)?.trim() ?: ""
            }
            data.uppercase().startsWith("BEGIN:VEVENT") -> {
                type = "event"
                val summaryMatch = Regex("SUMMARY:(.+)", RegexOption.IGNORE_CASE).find(data)
                details["summary"] = summaryMatch?.groupValues?.get(1)?.trim() ?: "Event"
            }
            data.lowercase().startsWith("geo:") -> {
                type = "geo"
                val parts = data.removePrefix("geo:").split(",")
                if (parts.size >= 2) {
                    details["lat"] = parts[0]
                    details["lng"] = parts[1]
                }
            }
            Regex("^(978|979)\\d{10}$").matches(data) -> type = "isbn"
            Regex("^\\d{12}$").matches(data) -> type = "upc"
            Regex("^\\d{13}$").matches(data) -> type = "barcode"
            Regex("^[\\x00-\\x7F]+$").matches(data) && data.length in 6..39 && !data.contains(" ") -> type = "barcode"
            else -> type = "text"
        }

        return ParsedResult(type = type, content = data, details = details)
    }
}

data class ParsedResult(
    val type: String,
    val content: String,
    val details: Map<String, String> = emptyMap()
)
