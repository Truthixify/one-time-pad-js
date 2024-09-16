# One-Time Pad Implementation in JavaScript

This project is a simple implementation of the One-Time Pad (OTP) encryption technique in JavaScript, designed to run directly in the browser. The user can input a message, which will be encrypted using a randomly generated key. The resulting ciphertext is then appended with the key, allowing the encrypted message to be shared with a friend. The friend can use the provided key to decrypt the message and retrieve the original content.

## Features

- **One-Time Pad Encryption**: A secure encryption method that uses a randomly generated key of the same length as the message.
- **Browser-Based**: Implemented in JavaScript and runs directly in the browser with no server-side components.
- **Message Sharing**: Ciphertext is combined with the key, allowing easy sharing of the encrypted message for decryption.
- **Decryption**: Recipients can easily decrypt the message using the provided key and ciphertext combination.

## How It Works

1. **Encryption**:
   - The user inputs a plain text message.
   - A random key of the same length as the message is generated.
   - Each character in the message is XORed with the corresponding character from the key to create the ciphertext.
   - The ciphertext is appended with the key to allow for message sharing.

2. **Decryption**:
   - The recipient extracts the ciphertext and key from the shared data.
   - Using the same XOR process, the original message is decrypted by XORing the ciphertext with the key.

## Usage

### Encryption

1. Open the browser and navigate to the page where the One-Time Pad is implemented.
2. Input your message in the provided text area.
3. Click the "ENCRYPT" button to generate the ciphertext.
4. Copy the result (ciphertext) and click the copy button to copy
5. Copy the result (ciphertext + key) and click the share button to share it with your friend.

### Decryption

1. Your can decrypt ciphertext by switching to decrypt mode and click the "DECRYPT" button.
2. Your friend will receive the ciphertext appended with the key.
3. They can input the entire string (ciphertext + key) in the decryption area on the page.
4. Click the "DECRYPT" button to retrieve the original message.

### Example

1. **Input Message**: `Hello World!`
2. **Generated Key**: `gP4sWd8Fk1J2`
3. **Ciphertext (after encryption)**: A series of random characters.
4. **Shared Data (ciphertext + key)**: The encrypted message and the key combined for sharing.

### Technologies Used

- **HTML**: For the user interface.
- **CSS**: For basic styling of the interface.
- **JavaScript**: The core encryption and decryption logic.

## Installation

No installation is required. Simply open the HTML file in a browser to start using the encryption tool.

1. Clone the repository:

```bash
git clone https://github.com/truthixify/one-time-pad-js.git
```

2. Open the project directory:
   
```bash
cd one-time-pad-js
```
3. Open index.html in your browser.

### How to Share a Message

1. After encryption, you will receive ciphertext.
2. Click share and share it with your friend through any communication method.
3. Your friend will paste the combined string into the decryption input field and click "DECRYPT" to retrieve the original message.

## Security Considerations
- **One-Time Use**: The key must only be used once to maintain the security of the One-Time Pad. Reusing keys compromises the encryption.
- **Key Security**: Ensure the key is shared securely, as anyone with access to both the key and the ciphertext can decrypt the message.
- **Random Key Generation**: The randomness of the key is critical for ensuring the encryption's security. The key should be truly random and not predictable.

 ## Future Improvements
- Improve UI/UX for better user experience.
- Add an option to securely share the ciphertext and key through a URL.
- Implement support for file encryption/decryption.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributing
Contributions are welcome! If you would like to contribute to this project, feel free to fork the repository and submit a pull request.

## Contact
For any inquiries or suggestions, please reach out via truthixify@gmail.com.
