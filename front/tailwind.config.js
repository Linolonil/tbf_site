import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'

  ],
  theme: {
    fontFamily: {
      'MyVikingFont': 'MyVikingFont',
      'MyVikingFont-title': 'MyVikingFont_title',
      'sans': ['ui-sans-serif', 'system-ui']
    },
    extend: {
      dropShadow: {
        'md-hover': '0 10px 10px #B91C1C',
        'md': '0 10px 10px #fff',
        'red': '0 5px 5px #B91C1C',
      },
      backgroundImage: {
        'hero-pattern': "url('./public/back-transformed.jpeg')",
      }
    }
  },
  plugins: [  
    flowbitePlugin
  ],
};
