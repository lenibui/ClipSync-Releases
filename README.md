# ClipSync

Private clipboard synchronization between Windows and Mac on the same local network.

## Download

- [Windows installer](https://github.com/lenibui/ClipSync-Releases/releases/latest/download/ClipSync-Setup.exe)
- [macOS installer — Apple Silicon](https://github.com/lenibui/ClipSync-Releases/releases/latest/download/ClipSync.dmg)
- [All releases](https://github.com/lenibui/ClipSync-Releases/releases)

Install on both computers, enable pairing, and confirm the matching code. Clipboard data travels only between paired devices over your LAN. No account is required.

## Automatic updates

Starting with 0.3.1, ClipSync checks for updates after startup and periodically in the background, downloads new versions automatically, and verifies their cryptographic signature. Choose **Restart & update** in Settings when ready. You do not need to download future EXE/DMG files yourself. Install this update-enabled version manually once if upgrading from 0.3.0 or older.

These personal builds are not signed with commercial Windows or Apple Developer certificates. The Mac app is ad-hoc signed, but not notarized; macOS may require an explicit first-launch exception. Updating does not change this OS trust requirement.

This public repository contains release files and publication automation. Application source remains private. Public downloads grant no access to anyone's clipboard; pairing is always required.
