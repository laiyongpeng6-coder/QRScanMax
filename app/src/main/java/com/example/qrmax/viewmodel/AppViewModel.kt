package com.example.qrmax.viewmodel

import androidx.lifecycle.ViewModel
import com.example.qrmax.data.model.ScannedItem
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class AppViewModel : ViewModel() {

    private val _hasSeenOnboarding = MutableStateFlow(false)
    val hasSeenOnboarding: StateFlow<Boolean> = _hasSeenOnboarding.asStateFlow()

    private val _history = MutableStateFlow<List<ScannedItem>>(emptyList())
    val history: StateFlow<List<ScannedItem>> = _history.asStateFlow()

    fun setHasSeenOnboarding(value: Boolean) {
        _hasSeenOnboarding.value = value
    }

    fun addToHistory(item: ScannedItem) {
        _history.update { listOf(item) + it }
    }

    fun findItemById(id: String): ScannedItem? {
        return _history.value.find { it.id == id }
    }
}
