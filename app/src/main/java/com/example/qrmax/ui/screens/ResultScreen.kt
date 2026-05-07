package com.example.qrmax.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.Language
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.SignalWifi4Bar
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.qrmax.data.model.ScannedItem
import com.example.qrmax.ui.components.MockNativeAd
import com.example.qrmax.ui.theme.PrimaryBlue
import androidx.compose.ui.tooling.preview.Preview
import com.example.qrmax.ui.theme.QRMaxTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ResultScreen(
    item: ScannedItem?,
    onBack: () -> Unit,
    onNavigateBeautify: () -> Unit
) {
    if (item == null) {
        Box(Modifier.fillMaxSize().background(Color(0xFFF9FAFB)), contentAlignment = Alignment.Center) {
            Text("Item not found.", color = Color.Gray)
        }
        return
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Result", fontWeight = FontWeight.SemiBold, color = Color(0xFF1F2937)) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = null)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color(0xFFF9FAFB))
            )
        },
        containerColor = Color(0xFFF9FAFB)
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .verticalScroll(rememberScrollState())
                .padding(16.dp)
        ) {
            ResultCard(item = item)
            Spacer(Modifier.height(16.dp))
            MockNativeAd()
            Spacer(Modifier.height(16.dp))
            if (item.type in listOf("url", "social", "text")) {
                BeautifyUpsell(onNavigateBeautify)
            }
            Spacer(Modifier.height(80.dp))
        }
    }
}

@Composable
private fun ResultCard(item: ScannedItem) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White)
            .padding(24.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color(0xFFDBEAFE)),
                contentAlignment = Alignment.Center
            ) {
                Icon(getTypeIcon(item.type), contentDescription = null, modifier = Modifier.size(32.dp), tint = getTypeColor(item.type))
            }
            Spacer(Modifier.width(16.dp))
            Column {
                Text(item.type.replaceFirstChar { it.uppercase() }, fontSize = 20.sp, fontWeight = FontWeight.SemiBold, color = Color(0xFF1F2937))
                Text("Scanned today", fontSize = 14.sp, color = Color(0xFF6B7280))
            }
        }
        Spacer(Modifier.height(24.dp))
        Text(item.content, fontSize = 14.sp, color = Color(0xFF1F2937))
        Spacer(Modifier.height(16.dp))

        when (item.type) {
            "wifi" -> WifiDetails(item.details)
            "vcard" -> VCardDetails(item.details)
            "geo" -> GeoDetails(item.details)
        }

        Spacer(Modifier.height(16.dp))
        Button(
            onClick = { },
            modifier = Modifier.fillMaxWidth().height(52.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue)
        ) {
            Text("Take Action", fontWeight = FontWeight.SemiBold)
        }
        Spacer(Modifier.height(12.dp))
        Row(modifier = Modifier.fillMaxWidth()) {
            ActionChip("Copy", Icons.Default.ContentCopy, modifier = Modifier.weight(1f))
            Spacer(Modifier.width(12.dp))
            ActionChip("Share", Icons.Default.Share, modifier = Modifier.weight(1f))
        }
    }
}

@Composable
private fun WifiDetails(details: Map<String, String>) {
    Column(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(Color(0xFFF3F4F6)).padding(16.dp)) {
        Text("SSID: ${details["ssid"]}", fontSize = 14.sp, fontWeight = FontWeight.SemiBold)
        Text("Password: ${details["password"] ?: "None"}", fontSize = 14.sp, color = Color(0xFF6B7280))
    }
}

@Composable
private fun VCardDetails(details: Map<String, String>) {
    Column(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(Color(0xFFF3F4F6)).padding(16.dp)) {
        Text("Name: ${details["name"]}", fontSize = 14.sp, fontWeight = FontWeight.SemiBold)
        Text("Org: ${details["org"]}", fontSize = 14.sp, color = Color(0xFF6B7280))
        Text("Tel: ${details["tel"]}", fontSize = 14.sp, color = Color(0xFF6B7280))
    }
}

@Composable
private fun GeoDetails(details: Map<String, String>) {
    Column(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(Color(0xFFF3F4F6)).padding(16.dp)) {
        Text("Lat: ${details["lat"]}", fontSize = 14.sp)
        Text("Lng: ${details["lng"]}", fontSize = 14.sp)
    }
}

@Composable
private fun ActionChip(label: String, icon: ImageVector, modifier: Modifier = Modifier) {
    Row(
        modifier = modifier.height(48.dp).clip(RoundedCornerShape(12.dp)).background(Color(0xFFF3F4F6)),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Spacer(Modifier.weight(1f))
        Icon(icon, contentDescription = null, modifier = Modifier.size(16.dp), tint = Color(0xFF374151))
        Spacer(Modifier.width(8.dp))
        Text(label, fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF374151))
        Spacer(Modifier.weight(1f))
    }
}

@Composable
private fun BeautifyUpsell(onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color(0xFFDBEAFE))
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.AutoAwesome, contentDescription = null, modifier = Modifier.size(16.dp), tint = PrimaryBlue)
                Spacer(Modifier.width(4.dp))
                Text("Beautify Workspace", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = PrimaryBlue)
            }
            Text("Add Logos, Colors & Style", fontSize = 12.sp, color = Color(0xFF6B7280))
        }
        Button(
            onClick = onClick,
            shape = RoundedCornerShape(8.dp),
            colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue)
        ) {
            Text("Open", fontSize = 14.sp, fontWeight = FontWeight.SemiBold)
        }
    }
}

private fun getTypeIcon(type: String): ImageVector = when (type) {
    "url", "social" -> Icons.Default.Language
    "barcode", "isbn", "upc" -> Icons.Default.ShoppingCart
    "wifi" -> Icons.Default.SignalWifi4Bar
    "vcard" -> Icons.Default.Person
    "event" -> Icons.Default.CalendarMonth
    "geo" -> Icons.Default.LocationOn
    else -> Icons.Default.Description
}

private fun getTypeColor(type: String): Color = when (type) {
    "url", "social" -> Color(0xFF3B82F6)
    "barcode", "isbn", "upc" -> Color(0xFF8B5CF6)
    "wifi" -> Color(0xFF16A34A)
    "vcard" -> Color(0xFF6366F1)
    "event" -> Color(0xFFDB2777)
    "geo" -> Color(0xFFEF4444)
    else -> Color(0xFF9CA3AF)
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun ResultScreenPreview() {
    val item = ScannedItem("1", "url", "https://example.com", System.currentTimeMillis())
    QRMaxTheme { ResultScreen(item = item, onBack = {}, onNavigateBeautify = {}) }
}
