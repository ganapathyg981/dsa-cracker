# DSA Pattern Decision System

An interactive decision tree system to help you identify the right DSA pattern and get code templates for solving coding problems.

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser at `http://localhost:5173/`

### Build

```bash
npm run build
```

## 📁 Project Structure

```
dsa-pattern-system/
├── src/
│   ├── components/          # React components
│   │   ├── Menu.jsx        # Main menu with topic selection
│   │   ├── DecisionFlow.jsx # Decision tree navigation
│   │   ├── ResultDisplay.jsx # Pattern result display
│   │   └── ProTips.jsx     # Tips section
│   ├── data/               # Data files
│   │   ├── decisionTrees.js # All decision tree data
│   │   └── topics.js       # Topic configuration
│   ├── App.jsx             # Main app component
│   ├── App.css             # App styles
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles with Tailwind
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## 🎯 Features

- **11 DSA Topics**: Arrays, Two Pointers, Sliding Window, Binary Search, Trees, Graphs, Dynamic Programming, Intervals, Greedy, Backtracking, and Heaps
- **Interactive Decision Trees**: Answer questions to find the right pattern
- **Code Templates**: Get Java code templates for each pattern
- **Practice Problems**: Recommended LeetCode problems for each pattern
- **Modular Architecture**: Clean separation of concerns with reusable components

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v3** - Styling
- **Lucide React** - Icons

## 📦 Components

### Menu.jsx
Main landing page showing all DSA topics with icons and navigation.

### DecisionFlow.jsx
Handles the question-answer flow through the decision tree with breadcrumb navigation.

### ResultDisplay.jsx
Shows the final pattern match with:
- Pattern name
- When to use guidelines
- Code template
- Practice problems

### ProTips.jsx
Displays helpful tips for learning DSA patterns.

## 💾 Data Structure

Decision trees are stored in `src/data/decisionTrees.js` with the following structure:

```javascript
{
  'topic-id': {
    title: 'Topic Name',
    question: 'Initial question',
    options: [
      {
        label: 'Option text',
        next: { /* nested questions */ },
        result: { /* final pattern */ }
      }
    ]
  }
}
```

## 🎨 Customization

- **Add new topics**: Update `src/data/topics.js`
- **Add new patterns**: Update `src/data/decisionTrees.js`
- **Modify styling**: Edit Tailwind classes or `src/index.css`
- **Change colors**: Update Tailwind config in `tailwind.config.js`

## 📝 License

MIT

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests!
