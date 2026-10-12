export const BAG_DRAWER_EVENT = "bag-drawer:open";

export function openBagDrawer(mode = "added") {
    window.dispatchEvent(new CustomEvent(BAG_DRAWER_EVENT, { detail: { mode } }));
}