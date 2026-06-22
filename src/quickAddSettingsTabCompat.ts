import { Setting } from "obsidian";
import {
QuickAddSettingsTab as BaseQuickAddSettingsTab,
} from "./quickAddSettingsTab";

type ControlDefinition = {
type?: string;
key?: string;
defaultValue?: unknown;
options?: Record<string, string>;
};

type RuntimeSettingDefinition = {
type?: string;
heading?: string;
items?: RuntimeSettingDefinition[];
name?: string;
desc?: string;
render?: (setting: Setting) => void | (() => void);
control?: ControlDefinition;
};

export class QuickAddSettingsTab extends BaseQuickAddSettingsTab {
display(): void {
this.containerEl.empty();

for (const definition of this.getSettingDefinitions() as RuntimeSettingDefinition[]) {
this.renderRuntimeDefinition(definition);
}
}

private renderRuntimeDefinition(definition: RuntimeSettingDefinition): void {
if (definition.type === "group") {
if (definition.heading) {
new Setting(this.containerEl).setName(definition.heading).setHeading();
}

for (const item of definition.items ?? []) {
this.renderRuntimeDefinition(item);
}

return;
}

const setting = new Setting(this.containerEl);

if (definition.name) setting.setName(definition.name);
if (definition.desc) setting.setDesc(definition.desc);
if (definition.render) definition.render(setting);
if (definition.control) this.renderRuntimeControl(setting, definition.control);
}

private renderRuntimeControl(setting: Setting, control: ControlDefinition): void {
if (!control.key) return;

if (control.type === "toggle") {
setting.addToggle((toggle) => {
toggle
.setValue(Boolean(this.getControlValue(control.key as string)))
.onChange((value) => this.setControlValue(control.key as string, value));
});

return;
}

if (control.type === "dropdown") {
setting.addDropdown((dropdown) => {
for (const [value, label] of Object.entries(control.options ?? {})) {
dropdown.addOption(value, label);
}

const currentValue =
this.getControlValue(control.key as string) ?? control.defaultValue;

if (typeof currentValue === "string") {
dropdown.setValue(currentValue);
}

dropdown.onChange((value) =>
this.setControlValue(control.key as string, value),
);
});
}
}
}
