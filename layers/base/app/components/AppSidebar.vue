<script setup lang="ts">
import { useNavigation } from '../composables/useNavigation';
import type { NavigationItem } from '../composables/useNavigation';

const { navigationData, toggleAccordion, closeDrawer } = useNavigation();

const handleItemClick = (item: NavigationItem) => {
  if (item.children) {
    toggleAccordion(item);
  } else {
    // Navigate and close drawer on mobile
    closeDrawer();
  }
};
</script>

<template>
  <aside class="c-sidebar">
    <div class="c-sidebar__header">
      <div class="c-sidebar__logo">BizTool</div>
    </div>
    <nav class="c-sidebar__nav">
      <ul class="c-sidebar__list c-sidebar__list--level-1">
        <li
          v-for="item in navigationData"
          :key="item.label"
          class="c-sidebar__item"
          :class="{ 'c-sidebar__item--active': item.isOpen }"
        >
          <!-- Level 1 Link or Toggle -->
          <div
            v-if="item.children"
            class="c-sidebar__link"
            @click="handleItemClick(item)"
          >
            <span class="c-sidebar__label">{{ item.label }}</span>
            <span class="c-sidebar__toggle-icon">
              {{ item.isOpen ? '−' : '+' }}
            </span>
          </div>
          <NuxtLink
            v-else
            :to="item.to"
            class="c-sidebar__link"
            @click="closeDrawer"
          >
            <span class="c-sidebar__label">{{ item.label }}</span>
          </NuxtLink>

          <!-- Level 2 -->
          <ul v-if="item.children" class="c-sidebar__list c-sidebar__list--level-2" v-show="item.isOpen">
            <li
              v-for="subItem in item.children"
              :key="subItem.label"
              class="c-sidebar__item"
              :class="{ 'c-sidebar__item--active': subItem.isOpen }"
            >
              <div
                v-if="subItem.children"
                class="c-sidebar__link"
                @click.stop="subItem.isOpen = !subItem.isOpen"
              >
                <span class="c-sidebar__label">{{ subItem.label }}</span>
                <span class="c-sidebar__toggle-icon">
                  {{ subItem.isOpen ? '−' : '+' }}
                </span>
              </div>
              <NuxtLink
                v-else
                :to="subItem.to"
                class="c-sidebar__link"
                @click="closeDrawer"
              >
                <span class="c-sidebar__label">{{ subItem.label }}</span>
              </NuxtLink>

              <!-- Level 3 -->
              <ul v-if="subItem.children" class="c-sidebar__list c-sidebar__list--level-3" v-show="subItem.isOpen">
                <li
                  v-for="subSubItem in subItem.children"
                  :key="subSubItem.label"
                  class="c-sidebar__item"
                >
                  <NuxtLink
                    :to="subSubItem.to"
                    class="c-sidebar__link"
                    @click="closeDrawer"
                  >
                    <span class="c-sidebar__label">{{ subSubItem.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
@use "../assets/scss/foundation/variables" as *;
@use "../assets/scss/foundation/mixins" as *;

.c-sidebar {
  width: 280px;
  background-color: $color-sidebar-bg;
  border-right: 1px solid $color-border;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__header {
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid $color-border;
  }

  &__logo {
    font-size: 1.25rem;
    font-weight: bold;
    color: $color-primary;
  }

  &__nav {
    flex: 1;
    overflow-y: auto;
    padding: 16px 0;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    color: $color-text;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba($color-primary, 0.05);
      color: $color-primary;
    }

    &.router-link-active {
      background-color: rgba($color-primary, 0.1);
      color: $color-primary;
      font-weight: 500;
      border-right: 3px solid $color-primary;
    }
  }

  &__toggle-icon {
    font-size: 1.2rem;
    line-height: 1;
    color: #999;
  }

  // Indentation for nested levels
  &__list--level-2 {
    background-color: rgba(0, 0, 0, 0.02);
    .c-sidebar__link {
      padding-left: 32px;
    }
  }

  &__list--level-3 {
    background-color: rgba(0, 0, 0, 0.04);
    .c-sidebar__link {
      padding-left: 48px;
    }
  }
}
</style>
