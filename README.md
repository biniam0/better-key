# better-key

> High availability key manager for multi-key deployments in Node.js environments.

`better-key` is a lightweight TypeScript library that manages multiple API keys with intelligent rotation strategies to improve reliability and fault tolerance in production systems.

It is designed for applications that operate with multiple API keys and need automatic key balancing, health tracking, and failure handling.

---

## ✨ Features

* 🔄 Multiple key rotation strategies
* 📊 Usage tracking per key
* 🚦 Automatic unhealthy key detection
* 🧠 Least-used load balancing
* 🎲 Random selection strategy
* 🛡 Designed for high-availability systems
* ⚡ Zero external dependencies
* 🧩 Fully typed with TypeScript

---

## 📦 Installation

```bash
npm install better-key
```

or

```bash
yarn add better-key
```

---

## 🚀 Quick Start

### 1️⃣ Add your API keys to `.env`

```env
GEMINI_KEYS=key1,key2,key3
```

---

### 2️⃣ Initialize the manager

```ts
import { KeyManager } from "better-key";

const manager = new KeyManager({
  provider: "gemini",
  keys: process.env.GEMINI_KEYS!.split(","),
  strategy: "least-used", // optional
});
```

---

### 3️⃣ Use a key

```ts
const apiKey = manager.getKey();
```

---

### 4️⃣ Report errors (optional but recommended)

```ts
manager.reportError(apiKey);
```

If a key exceeds the internal error threshold, it will automatically be marked as unhealthy and excluded from rotation.

---

## 🧠 Available Strategies

| Strategy      | Description                       |
| ------------- | --------------------------------- |
| `round-robin` | Cycles through keys sequentially  |
| `least-used`  | Selects the key with lowest usage |
| `random`      | Selects a random healthy key      |

Example:

```ts
const manager = new KeyManager({
  provider: "openai",
  keys: ["key1", "key2"],
  strategy: "round-robin",
});
```

---

## 🏗 How It Works

Each key maintains internal metadata:

* `usageCount`
* `errorCount`
* `lastUsed`
* `healthy` status

When:

* `getKey()` is called → key is selected based on strategy
* `reportError(key)` is called → error counter increases
* Error threshold exceeded → key marked unhealthy

Unhealthy keys are automatically excluded from future selections.

---

## 🛠 Example with Gemini

Example usage with the Gemini API from Google DeepMind:

```ts
async function callModel(prompt: string) {
  const key = manager.getKey();

  try {
    // Make request using selected key
  } catch (error: any) {
    if (error.status === 429) {
      manager.reportError(key);
    }
  }
}
```

---

## 🌍 Supported Environments

Works in:

* Next.js
* Express.js
* Hono
* Node.js server applications
* Serverless functions
* Edge runtimes (if no Node-only APIs are used)

---

## ⚠️ Important Notice

`better-key` is designed for legitimate multi-key deployments and high availability setups.

It does **not** bypass provider rate limits or quotas.
Always ensure your usage complies with your API provider's Terms of Service.

---

## 🔮 Roadmap

* [ ] Redis adapter for distributed systems
* [ ] Cooldown mechanism for unhealthy keys
* [ ] Event system (onKeyDisabled, onKeyRecovered)
* [ ] Metrics export
* [ ] Custom error thresholds
* [ ] Concurrency-safe locking

---

## 🧪 Testing

```bash
npm test
```

---

## 📄 License

MIT

---

## 🤝 Contributing

Contributions are welcome. Please open an issue or submit a pull request.

---

## 👨‍💻 Author

Built for developers building reliable AI infrastructure.