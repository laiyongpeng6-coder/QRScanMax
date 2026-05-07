package com.example.qrmax.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.History
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.qrmax.data.model.ScannedItem
import com.example.qrmax.ui.components.MockNativeAd
import com.example.qrmax.ui.theme.PrimaryBlue
import com.example.qrmax.viewmodel.AppViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import androidx.compose.ui.tooling.preview.Preview
import com.example.qrmax.ui.theme.QRMaxTheme

@Composable
fun HistoryScreen(
    viewModel: AppViewModel,
    onItemClick: (String) -> Unit
) {
    val history by viewModel.history.collectAsState()

    Column(
        modifier = Modifier.fillMaxSize().background(Color(0xFFF9FAFB)).padding(16.dp)
    ) {
        Spacer(Modifier.height(16.dp))
        Text("Scan History", fontSize = 24.sp, fontWeight = FontWeight.SemiBold, color = Color(0xFF1F2937))
        Text("Your recent scans and creations", fontSize = 14.sp, color = Color(0xFF6B7280))
        Spacer(Modifier.height(16.dp))

        if (history.isEmpty()) {
            Box(
                modifier = Modifier.fillMaxSize().padding(top = 80.dp),
                contentAlignment = Alignment.TopCenter
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(Icons.Default.History, contentDescription = null, modifier = Modifier.size(48.dp), tint = Color(0xFFD1D5DB))
                    Spacer(Modifier.height(16.dp))
                    Text("No history yet.", fontSize = 14.sp, color = Color(0xFF9CA3AF))
                }
            }
        } else {
            LazyColumn {
                itemsIndexed(history) { index, item ->
                    if (index > 0 && index % 4 == 0) {
                        MockNativeAd(modifier = Modifier.padding(vertical = 8.dp))
                    }
                    HistoryItemRow(item = item, onClick = { onItemClick(item.id) })
                    Spacer(Modifier.height(8.dp))
                }
                item { Spacer(Modifier.height(80.dp)) }
            }
        }
    }
}

@Composable
private fun HistoryItemRow(item: ScannedItem, onClick: () -> Unit) {
    val dateFormat = SimpleDateFormat("MMM dd", Locale.getDefault())
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White)
            .clickable(onClick = onClick)
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    item.type.uppercase(),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = PrimaryBlue
                )
                Spacer(Modifier.weight(1f))
                Text(
                    dateFormat.format(Date(item.timestamp)),
                    fontSize = 12.sp,
                    color = Color(0xFF9CA3AF)
                )
            }
            Spacer(Modifier.height(4.dp))
            Text(
                item.content,
                fontSize = 14.sp,
                color = Color(0xFF1F2937),
                maxLines = 1
            )
        }
    }
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun HistoryScreenPreview() {
    val vm = com.example.qrmax.viewmodel.AppViewModel()
    vm.addToHistory(ScannedItem("1", "url", "https://example.com", System.currentTimeMillis()))
    vm.addToHistory(ScannedItem("2", "wifi", "WIFI:S:MyWiFi;P:1234;", System.currentTimeMillis(), mapOf("ssid" to "MyWiFi", "password" to "1234")))
    QRMaxTheme { HistoryScreen(viewModel = vm, onItemClick = {}) }
}
