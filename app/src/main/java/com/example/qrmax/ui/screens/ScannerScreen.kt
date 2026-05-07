package com.example.qrmax.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.qrmax.ui.components.ScanningOverlay
import androidx.compose.ui.tooling.preview.Preview
import com.example.qrmax.ui.theme.QRMaxTheme

@Composable
fun ScannerScreen() {
    Box(
        modifier = Modifier.fillMaxSize().background(Color.Black),
        contentAlignment = Alignment.Center
    ) {
        Box(
            modifier = Modifier.fillMaxSize().background(Color.DarkGray.copy(alpha = 0.15f))
        )
        ScanningOverlay()
        Text(
            "Point at a barcode",
            color = Color.White.copy(alpha = 0.6f),
            fontSize = 14.sp,
            modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = 40.dp)
        )
    }
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun ScannerScreenPreview() {
    QRMaxTheme {
        ScannerScreen()
    }
}
