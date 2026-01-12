<script setup>
const config = useRuntimeConfig();
const colorMode = useColorMode();
const { locale, locales, setLocale, t } = useI18n();

const isOpen = ref(false);
const dropdownRef = ref();

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const colorModeIcon = computed(() => (colorMode.preference === 'dark' ? 'i-iconamoon-mode-dark-fill' : 'i-iconamoon-mode-light-fill'));

onClickOutside(dropdownRef, () => (isOpen.value = false));

const currentLocale = computed(() => locales.value.find(l => l.code === locale.value));

const chooseLocale = code => {
  setLocale(code);
  isOpen.value = false;
};

const email = ref('');

const footerLinks = computed(() => [
  // {
  //   title: t('footer.shop'),
  //   links: [
  //     { label: t('nav.products'), to: '/' },
  //     { label: t('nav.categories'), to: '/categories' },
  //     { label: t('nav.favorites'), to: '/favorites' }
  //   ]
  // },
  {
    title: t('footer.company'),
    links: [
      { label: t('stores.find_store'), to: '/stores' },
      { label: t('footer.about_us'), to: '/about' },
      { label: t('footer.careers'), to: '/careers' }
    ]
  },
  {
    title: t('footer.support'),
    links: [
      { label: t('footer.contact'), to: '/contact' },
      { label: t('product.shipping_returns'), to: '/shipping' },
      { label: t('footer.faq'), to: '/faq' }
    ]
  }
]);

const handleSubscribe = () => {
  // TODO: Implement newsletter logic
  email.value = '';
  alert('Thanks for subscribing!');
};
</script>

<template>
  <footer class="mt-auto border-t border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 pt-12 pb-6 text-sm">
    <div class="container mx-auto px-5">

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">

        <div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="(column, idx) in footerLinks" :key="idx">
            <h3 class="font-bold text-black dark:text-white mb-4">{{ column.title }}</h3>
            <ul class="space-y-3">
              <li v-for="(link, lIdx) in column.links" :key="lIdx">
                <NuxtLink
                    :to="link.to"
                    class="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="lg:col-span-4">
          <h3 class="font-bold text-black dark:text-white mb-4">{{ $t('footer.newsletter_title') }}</h3>
          <p class="text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
            {{ $t('footer.newsletter_desc') }}
          </p>
          <form @submit.prevent="handleSubscribe" class="flex gap-2">
            <input
                v-model="email"
                type="email"
                :placeholder="$t('footer.email_placeholder')"
                required
                class="w-full bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            >
            <button type="submit" class="bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 rounded-xl font-bold hover:opacity-80 transition-opacity">
              <UIcon name="i-iconamoon-send-fill" size="20" />
            </button>
          </form>
        </div>
      </div>

      <hr class="border-gray-200 dark:border-neutral-800 mb-6" />

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 font-semibold text-secondary-text dark:text-secondary-text-d">

        <div class="text-center md:text-left">
          <a class="transition-all hover:text-black hover:dark:text-neutral-100" href="https://github.com/zackha/nuxtcommerce" target="_blank">
            NuxtCommerce v{{ config.public.version }}
          </a>
          —
          {{ $t('footer.developed_by_author') }}
          <a class="transition-all hover:text-black hover:dark:text-neutral-100" href="https://zackha.com" target="_blank">Sefa Bulak</a>
        </div>

        <div class="flex flex-none items-center gap-3">
          <div v-if="locales?.length > 1" class="relative" ref="dropdownRef">
            <UTooltip :text="$t('footer.change_language')" :open-delay="800">
              <button
                  type="button"
                  @click="isOpen = !isOpen"
                  :aria-expanded="isOpen"
                  aria-haspopup="listbox"
                  class="flex h-8 items-center gap-1.5 rounded-lg p-2 transition-all bg-neutral-200/50 hover:bg-neutral-200 hover:text-black active:scale-95 dark:bg-white/10 hover:dark:bg-white/20 hover:dark:text-neutral-100">
                {{ currentLocale.name }}
              </button>
            </UTooltip>

            <Transition name="dropdown">
              <div
                  v-if="isOpen"
                  class="absolute bottom-full right-0 z-10 mb-3 rounded-2xl bg-white text-base font-semibold shadow-[0_0_8px_rgba(0,0,0,.1)] dark:bg-[#262626]"
                  role="listbox">
                <ul class="m-2 text-sm w-44">
                  <li
                      v-for="item in locales"
                      :key="item.code || item.name"
                      @click="chooseLocale(item.code)"
                      class="cursor-pointer rounded-[10px] px-3 py-2 transition-all duration-300 hover:bg-[#e9e9e9] text-black hover:dark:bg-[#3c3c3c] dark:text-white"
                      role="option"
                      :aria-selected="locale === item.code"
                      tabindex="0"
                      @keydown.enter.prevent="chooseLocale(item.code)">
                    <div class="flex items-center justify-between">
                      <span class="mr-1 truncate">{{ item.name }}</span>
                      <UIcon v-if="locale === item.code" name="i-iconamoon-check-circle-1-fill" size="20" />
                    </div>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>

          <UTooltip :text="$t('theme.toggle')" :open-delay="800">
            <button
                type="button"
                @click="toggleDark"
                class="flex h-8 items-center gap-1.5 rounded-lg p-2 transition-all bg-neutral-200/50 hover:bg-neutral-200 hover:text-black active:scale-95 dark:bg-white/10 hover:dark:bg-white/20 hover:dark:text-neutral-100">
              <UIcon :name="colorModeIcon" size="16" />
              <span class="capitalize leading-3">
                {{ $t('theme.' + colorMode.preference) }}
              </span>
            </button>
          </UTooltip>
        </div>
      </div>
    </div>
  </footer>
</template>