package com.example.qrmax.ui.screens

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.QrCodeScanner
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.qrmax.ui.theme.PrimaryBlue
import androidx.compose.ui.tooling.preview.Preview
import com.example.qrmax.ui.theme.QRMaxTheme

private data class OnboardPage(
    val title: String,
    val subtitle: String,
    val icon: ImageVector,
    val accentColor: Color
)

private val pages = listOf(
    OnboardPage(
        "Scan QR Codes",
        "Instantly scan and decipher QR codes. Connect to Wi-Fi, open links, and save contacts.",
        Icons.Default.QrCodeScanner,
        PrimaryBlue
    ),
    OnboardPage(
        "Barcode Product Info",
        "Scan product barcodes in seconds to instantly retrieve details and search shopping links.",
        Icons.Default.QrCodeScanner,
        Color(0xFF16A34A)
    ),
    OnboardPage(
        "Generate & Beautify",
        "Create your own QR codes and transform them into beautiful gradients with unique icons.",
        Icons.Default.AutoAwesome,
        Color(0xFFDB2777)
    )
)

@Composable
fun OnboardingScreen(onFinish: () -> Unit) {
    var step by remember { mutableIntStateOf(0) }

    Column(
        modifier = Modifier.fillMaxSize().background(Color(0xFFF9FAFB)),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Box(modifier = Modifier.weight(1f), contentAlignment = Alignment.Center) {
            AnimatedContent(
                targetState = step,
                transitionSpec = {
                    (slideInHorizontally(initialOffsetX = { it }) + fadeIn(tween(300)))
                        .togetherWith(slideOutHorizontally(targetOffsetX = { -it }) + fadeOut(tween(300)))
                },
                label = "onboard_transition"
            ) { currentStep ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(horizontal = 32.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(224.dp)
                            .clip(CircleShape)
                            .background(pages[currentStep].accentColor.copy(alpha = 0.1f))
                            .border(1.dp, pages[currentStep].accentColor.copy(alpha = 0.2f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Box(
                            modifier = Modifier
                                .size(160.dp)
                                .clip(CircleShape)
                                .background(Color.White),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                pages[currentStep].icon,
                                contentDescription = null,
                                modifier = Modifier.size(64.dp),
                                tint = pages[currentStep].accentColor
                            )
                        }
                    }
                    Spacer(Modifier.height(48.dp))
                    Text(
                        pages[currentStep].title,
                        fontSize = 30.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color(0xFF1F2937),
                        textAlign = TextAlign.Center
                    )
                    Spacer(Modifier.height(16.dp))
                    Text(
                        pages[currentStep].subtitle,
                        fontSize = 18.sp,
                        color = Color(0xFF6B7280),
                        textAlign = TextAlign.Center,
                        lineHeight = 28.sp
                    )
                }
            }
        }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            pages.indices.forEach { i ->
                Box(
                    modifier = Modifier
                        .size(if (i == step) 32.dp else 8.dp)
                        .height(6.dp)
                        .clip(RoundedCornerShape(3.dp))
                        .background(if (i == step) PrimaryBlue else Color(0xFFD1D5DB))
                )
            }
        }

        Spacer(Modifier.height(32.dp))

        Button(
            onClick = {
                if (step == pages.size - 1) onFinish()
                else step++
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp)
                .height(56.dp),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue)
        ) {
            Text(
                if (step == pages.size - 1) "Start Scanning" else "Continue",
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold
            )
            Spacer(Modifier.width(8.dp))
            Icon(Icons.AutoMirrored.Filled.ArrowForward, contentDescription = null, modifier = Modifier.size(20.dp))
        }

        Spacer(Modifier.height(24.dp))
        Text(
            "By continuing, you agree to our Terms and Privacy Policy",
            fontSize = 12.sp,
            color = Color(0xFF9CA3AF)
        )

        Spacer(Modifier.height(48.dp))
    }
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun OnboardingScreenPreview() {
    QRMaxTheme {
        OnboardingScreen(onFinish = {})
    }
}
