package com.example.qrmax

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.HelpOutline
import androidx.compose.material.icons.filled.QrCode
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
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
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.qrmax.ui.components.BottomNavItem
import com.example.qrmax.ui.screens.BeautifyScreen
import com.example.qrmax.ui.screens.CreateBarcodeScreen
import com.example.qrmax.ui.screens.CreateQRScreen
import com.example.qrmax.ui.screens.GeneratorScreen
import com.example.qrmax.ui.screens.HistoryScreen
import com.example.qrmax.ui.screens.OnboardingScreen
import com.example.qrmax.ui.screens.ResultScreen
import com.example.qrmax.ui.screens.ScannerScreen
import com.example.qrmax.ui.screens.SettingsScreen
import com.example.qrmax.ui.screens.SplashScreen
import com.example.qrmax.ui.theme.BackgroundGray
import com.example.qrmax.ui.theme.DarkText
import com.example.qrmax.ui.theme.InactiveGray
import com.example.qrmax.ui.theme.PrimaryBlue
import com.example.qrmax.ui.theme.QRMaxTheme
import com.example.qrmax.viewmodel.AppViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            QRMaxTheme {
                AppRoot()
            }
        }
    }
}

@Composable
fun AppRoot() {
    val navController = rememberNavController()
    val viewModel: AppViewModel = viewModel()

    NavHost(navController = navController, startDestination = "splash") {
        composable("splash") {
            SplashScreen(onFinish = {
                navController.navigate("onboarding") {
                    popUpTo("splash") { inclusive = true }
                }
            })
        }
        composable("onboarding") {
            val hasSeenOnboarding by viewModel.hasSeenOnboarding.collectAsState()
            OnboardingScreen(onFinish = {
                viewModel.setHasSeenOnboarding(true)
                navController.navigate("main") {
                    popUpTo("onboarding") { inclusive = true }
                }
            })
        }
        composable("main") {
            MainScreen(
                viewModel = viewModel,
                parentNavController = navController
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    viewModel: AppViewModel,
    parentNavController: NavHostController
) {
    val innerNavController = rememberNavController()
    val navBackStackEntry by innerNavController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: "scanner"

    Scaffold(
        topBar = {
            val isSubPage = currentRoute in listOf("settings", "result", "create_qr", "create_barcode", "beautify")
            if (!isSubPage) {
                TopAppBar(
                    title = {
                        Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                            Text(
                                text = when {
                                    currentRoute.startsWith("history") -> "Scan History"
                                    currentRoute.startsWith("generator") -> "Generate QR"
                                    else -> "Point at a barcode"
                                },
                                fontSize = 16.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = DarkText
                            )
                        }
                    },
                    navigationIcon = {
                        IconButton(onClick = { innerNavController.navigate("settings") }) {
                            Box(
                                modifier = Modifier
                                    .size(40.dp)
                                    .clip(androidx.compose.foundation.shape.CircleShape)
                                    .background(Color(0xFFF3F4F6)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.Settings, contentDescription = "Settings", modifier = Modifier.size(20.dp), tint = Color(0xFF6B7280))
                            }
                        }
                    },
                    actions = {
                        IconButton(onClick = { }) {
                            Box(
                                modifier = Modifier
                                    .size(40.dp)
                                    .clip(androidx.compose.foundation.shape.CircleShape)
                                    .background(Color(0xFFF3F4F6)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.HelpOutline, contentDescription = "Help", modifier = Modifier.size(20.dp), tint = Color(0xFF6B7280))
                            }
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White.copy(alpha = 0.9f))
                )
            }
        },
        bottomBar = {
            val isSubPage = currentRoute in listOf("settings", "result", "create_qr", "create_barcode", "beautify")
            if (!isSubPage) {
                BottomAppBar(
                    containerColor = Color.White,
                    tonalElevation = 8.dp,
                    modifier = Modifier.height(80.dp)
                ) {
                    val items = listOf(
                        BottomNavItem.History,
                        BottomNavItem.Scanner,
                        BottomNavItem.Generator
                    )
                    items.forEach { item ->
                        val selected = currentRoute == item.route
                        NavigationBarItem(
                            selected = selected,
                            onClick = {
                                innerNavController.navigate(item.route) {
                                    popUpTo("scanner") { saveState = true }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            },
                            icon = { Icon(item.icon, contentDescription = item.label, modifier = Modifier.size(24.dp)) },
                            label = { Text(item.label, fontSize = 12.sp, fontWeight = FontWeight.Bold) },
                            colors = NavigationBarItemDefaults.colors(
                                selectedIconColor = PrimaryBlue,
                                selectedTextColor = PrimaryBlue,
                                unselectedIconColor = InactiveGray,
                                unselectedTextColor = InactiveGray,
                                indicatorColor = Color.Transparent
                            ),
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        },
        floatingActionButton = {
            val isSubPage = currentRoute in listOf("settings", "result", "create_qr", "create_barcode", "beautify")
            if (!isSubPage) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(bottom = 16.dp)
                ) {
                    FloatingActionButton(
                        onClick = {
                            if (currentRoute != "scanner") {
                                innerNavController.navigate("scanner") {
                                    popUpTo("scanner") { inclusive = true }
                                }
                            }
                        },
                        shape = androidx.compose.foundation.shape.CircleShape,
                        containerColor = PrimaryBlue,
                        contentColor = Color.White,
                        elevation = FloatingActionButtonDefaults.elevation(defaultElevation = 8.dp),
                        modifier = Modifier.size(64.dp)
                    ) {
                        Icon(Icons.Default.QrCode, contentDescription = "Scan", modifier = Modifier.size(32.dp))
                    }
                }
            }
        },
        floatingActionButtonPosition = androidx.compose.material3.FabPosition.Center,
        containerColor = BackgroundGray
    ) { innerPadding ->
        NavHost(
            navController = innerNavController,
            startDestination = "scanner",
            modifier = Modifier.padding(innerPadding)
        ) {
            composable("scanner") { ScannerScreen() }
            composable("history") { HistoryScreen(viewModel = viewModel, onItemClick = { id -> innerNavController.navigate("result/$id") }) }
            composable("settings") { SettingsScreen(onBack = { innerNavController.popBackStack() }) }
            composable(
                "result/{id}",
                arguments = listOf(navArgument("id") { type = NavType.StringType })
            ) { backStackEntry ->
                val id = backStackEntry.arguments?.getString("id") ?: return@composable
                val item = viewModel.findItemById(id)
                ResultScreen(
                    item = item,
                    onBack = { innerNavController.popBackStack() },
                    onNavigateBeautify = { innerNavController.navigate("beautify") }
                )
            }
            composable("generator") {
                GeneratorScreen(
                    onNavigateCreateQR = { innerNavController.navigate("create_qr") },
                    onNavigateCreateBarcode = { innerNavController.navigate("create_barcode") },
                    onNavigateBeautify = { innerNavController.navigate("beautify") }
                )
            }
            composable("create_qr") { CreateQRScreen(onBack = { innerNavController.popBackStack() }) }
            composable("create_barcode") { CreateBarcodeScreen(onBack = { innerNavController.popBackStack() }) }
            composable("beautify") { BeautifyScreen(onBack = { innerNavController.popBackStack() }) }
        }
    }
}
