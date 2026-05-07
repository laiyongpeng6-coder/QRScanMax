package com.example.qrmax.ui.components

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp
import com.example.qrmax.ui.theme.PrimaryBlue

@Composable
fun ScanningOverlay(modifier: Modifier = Modifier) {
    val infiniteTransition = rememberInfiniteTransition(label = "scan_line")
    val scanLineProgress by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(2500, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "scan_line_progress"
    )

    Box(
        modifier = modifier
            .size(260.dp)
            .clip(RoundedCornerShape(32.dp))
            .border(1.dp, PrimaryBlue.copy(alpha = 0.3f), RoundedCornerShape(32.dp)),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val strokeWidth = 4.dp.toPx()
            val cornerLength = 40.dp.toPx()
            val color = PrimaryBlue

            drawPath(
                path = Path().apply {
                    moveTo(0f, cornerLength); lineTo(0f, 0f); lineTo(cornerLength, 0f)
                }, color = color, style = Stroke(width = strokeWidth)
            )
            drawPath(
                path = Path().apply {
                    moveTo(size.width - cornerLength, 0f); lineTo(size.width, 0f); lineTo(size.width, cornerLength)
                }, color = color, style = Stroke(width = strokeWidth)
            )
            drawPath(
                path = Path().apply {
                    moveTo(0f, size.height - cornerLength); lineTo(0f, size.height); lineTo(cornerLength, size.height)
                }, color = color, style = Stroke(width = strokeWidth)
            )
            drawPath(
                path = Path().apply {
                    moveTo(size.width - cornerLength, size.height); lineTo(size.width, size.height); lineTo(size.width, size.height - cornerLength)
                }, color = color, style = Stroke(width = strokeWidth)
            )

            val lineY = size.height * scanLineProgress
            drawLine(
                color = color,
                start = Offset(0f, lineY),
                end = Offset(size.width, lineY),
                strokeWidth = 2.dp.toPx()
            )
        }
    }
}
