import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    extend: {
      screens: {
        xs: '320px',
        '3xl': '1920px',
      },
      colors: {
        'secondary-text': '#737373',
        'secondary-text-d': '#a8a8a8',
        'alizarin-crimson': {
          '50': '#fff0f2',
          '100': '#ffdde2',
          '200': '#ffc1ca',
          '300': '#ff95a5',
          '400': '#ff5972',
          '500': '#ff2646',
          '600': '#fc062a',
          '700': '#e60022',
          '800': '#af051e',
          '900': '#900c20',
          '950': '#50000c',
        },
      },
    },
  },
};
