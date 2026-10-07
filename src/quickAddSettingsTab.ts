import type { App, Setting, SettingDefinitionGroup, SettingDefinitionItem, TextAreaComponent } from "obsidian";
import { ButtonComponent, ExtraButtonComponent, PluginSettingTab, TextComponent } from "obsidian";
import type QuickAdd from "./main";
import type IChoice from "./types/choices/IChoice";
import ChoiceView from "./gui/choiceList/ChoiceView.svelte";
import { mountComponent, type MountHandle } from "./gui/svelte/mountComponent";
import type { Plain } from "./gui/svelte/persist.svelte";
import { GenericTextSuggester } from "./gui/suggesters/genericTextSuggester";
import GlobalVariablesView from "./gui/GlobalVariables/GlobalVariablesView.svelte";
import { settingsStore } from "./settingsStore";
import { getAllFolderPathsInVault, normalizeTemplateFolderPaths } from "./utilityObsidian";
import { sortFolderPathsByTree } from "./utils/folder-sorting";
import { ExportPackageModal } from "./gui/PackageManager/ExportPackageModal";
import { ImportPackageModal } from "./gui/PackageManager/ImportPackageModal";
import { InputPromptDraftStore } from "./utils/InputPromptDraftStore";
import type { QuickAddSettings } from "./settings";
import { DEFAULT_DATE_ALIASES, formatDateAliasLines, parseDateAliasLines } from "./utils/dateAliases";
import { renderDevelopmentInfo } from "./quickAddSettingsDevelopmentInfo";
import { t } from "./i18n";

type SettingsKey = Extract<keyof QuickAddSettings, string>;

export class QuickAddSettingsTab extends PluginSettingTab {
	public plugin: QuickAdd;
	private choiceViewHandle: MountHandle | null = null;
	private globalVariablesViewHandle: MountHandle | null = null;

	constructor(app: App, plugin: QuickAdd) {
		super(app, plugin);
		this.plugin = plugin;
		this.icon = "zap";
	}

	override getControlValue(key: string): unknown {
		const state = settingsStore.getState();
		if (key === "inputPrompt") return state.inputPrompt === "multi-line";
		return state[key as keyof QuickAddSettings];
	}

	override setControlValue(key: string, value: unknown): void {
		if (key === "inputPrompt") {
			settingsStore.setState({ inputPrompt: value ? "multi-line" : "single-line" });
			return;
		}
		if (key === "persistInputPromptDrafts") {
			const enabled = Boolean(value);
			settingsStore.setState({ persistInputPromptDrafts: enabled });
			if (!enabled) InputPromptDraftStore.getInstance().clearAll();
			return;
		}
		settingsStore.setState({ [key]: value } as Partial<QuickAddSettings>);
	}

	override getSettingDefinitions(): SettingDefinitionItem<SettingsKey>[] {
		const groups: SettingDefinitionGroup<SettingsKey>[] = [
			this.choicesAndPackagesGroup(),
			this.choicePickerGroup(),
			this.inputGroup(),
			this.templatesGroup(),
			this.notificationsGroup(),
			this.globalVariablesGroup(),
			this.aiAndOnlineGroup(),
			this.appearanceGroup(),
		];
		if (__IS_DEV_BUILD__) groups.push(this.developerGroup());
		return groups;
	}

	override hide(): void {
		super.hide();
		this.destroySettingViews();
	}

	private destroySettingViews(): void {
		this.choiceViewHandle?.destroy();
		this.choiceViewHandle = null;
		this.globalVariablesViewHandle?.destroy();
		this.globalVariablesViewHandle = null;
	}

	private choicesAndPackagesGroup(): SettingDefinitionGroup<SettingsKey> {
		return { type: "group", heading: t("settings.groups.choicesAndPackages"), items: [
			{ name: t("settings.choices.name"), render: (setting) => this.renderChoicesView(setting) },
			{ name: t("settings.packages.name"), desc: t("settings.packages.desc"), render: (setting) => this.renderPackages(setting) },
		] };
	}

	private choicePickerGroup(): SettingDefinitionGroup<SettingsKey> {
		return { type: "group", heading: t("settings.groups.choicePicker"), items: [
			{ name: t("settings.searchNestedChoices.name"), desc: t("settings.searchNestedChoices.desc"), control: { type: "toggle", key: "searchNestedChoices" } },
			{ name: t("settings.templateFolderLauncherRow.name"), desc: t("settings.templateFolderLauncherRow.desc"), control: { type: "dropdown", key: "templateFolderLauncherRow", defaultValue: "bottom", options: { bottom: t("settings.templateFolderLauncherRow.bottom"), top: t("settings.templateFolderLauncherRow.top"), off: t("settings.templateFolderLauncherRow.off") } } },
		] };
	}

	private inputGroup(): SettingDefinitionGroup<SettingsKey> {
		return { type: "group", heading: t("settings.groups.input"), items: [
			{ name: t("settings.inputPrompt.name"), desc: t("settings.inputPrompt.desc"), control: { type: "toggle", key: "inputPrompt" } },
			{ name: t("settings.persistInputPromptDrafts.name"), desc: t("settings.persistInputPromptDrafts.desc"), control: { type: "toggle", key: "persistInputPromptDrafts" } },
			{ name: t("settings.useSelectionAsCaptureValue.name"), desc: t("settings.useSelectionAsCaptureValue.desc"), control: { type: "toggle", key: "useSelectionAsCaptureValue" } },
			{ name: t("settings.onePageInputEnabled.name"), desc: t("settings.onePageInputEnabled.desc"), control: { type: "toggle", key: "onePageInputEnabled" } },
			{ name: t("settings.dateAliases.name"), desc: t("settings.dateAliases.desc"), render: (setting) => this.renderDateAliases(setting) },
		] };
	}

	private templatesGroup(): SettingDefinitionGroup<SettingsKey> {
		return { type: "group", heading: t("settings.groups.templates"), items: [
			{ name: t("settings.templateFolderPaths.name"), desc: t("settings.templateFolderPaths.desc"), render: (setting) => this.renderTemplateFolderPaths(setting) },
			{ name: t("settings.enableTemplatePropertyTypes.name"), desc: t("settings.enableTemplatePropertyTypes.desc"), control: { type: "toggle", key: "enableTemplatePropertyTypes" } },
		] };
	}

	private notificationsGroup(): SettingDefinitionGroup<SettingsKey> {
		return { type: "group", heading: t("settings.groups.notifications"), items: [
			{ name: t("settings.announceUpdates.name"), desc: t("settings.announceUpdates.desc"), control: { type: "dropdown", key: "announceUpdates", defaultValue: "major", options: { all: t("settings.announceUpdates.all"), major: t("settings.announceUpdates.major"), none: t("settings.announceUpdates.none") } } },
			{ name: t("settings.showCaptureNotification.name"), desc: t("settings.showCaptureNotification.desc"), control: { type: "toggle", key: "showCaptureNotification" } },
			{ name: t("settings.showInputCancellationNotification.name"), desc: t("settings.showInputCancellationNotification.desc"), control: { type: "toggle", key: "showInputCancellationNotification" } },
		] };
	}

	private globalVariablesGroup(): SettingDefinitionGroup<SettingsKey> {
		return { type: "group", heading: t("settings.groups.globalVariables"), items: [
			{ name: t("settings.groups.globalVariables"), render: (setting) => this.renderGlobalVariablesView(setting) },
		] };
	}

	private aiAndOnlineGroup(): SettingDefinitionGroup<SettingsKey> {
		return { type: "group", heading: t("settings.groups.aiAndOnline"), items: [
			{ name: t("settings.disableOnlineFeatures.name"), desc: t("settings.disableOnlineFeatures.desc"), control: { type: "toggle", key: "disableOnlineFeatures" } },
			{ name: t("settings.enableUriCallbacks.name"), desc: t("settings.enableUriCallbacks.desc"), control: { type: "toggle", key: "enableUriCallbacks" } },
		] };
	}

	private appearanceGroup(): SettingDefinitionGroup<SettingsKey> {
		return { type: "group", heading: t("settings.groups.appearance"), items: [
			{ name: t("settings.enableRibbonIcon.name"), desc: t("settings.enableRibbonIcon.desc"), control: { type: "toggle", key: "enableRibbonIcon" } },
		] };
	}

	private developerGroup(): SettingDefinitionGroup<SettingsKey> {
		return { type: "group", heading: t("settings.groups.developer"), items: [
			{ name: t("settings.developmentInfo.name"), desc: t("settings.developmentInfo.desc"), render: (setting) => this.renderDevInfo(setting) },
		] };
	}

	private prepareFullWidthSetting(setting: Setting): void {
		setting.infoEl.remove();
		setting.settingEl.addClass("qa-setting-full-width");
		setting.controlEl.addClass("qa-setting-full-width-control");
	}

	private renderChoicesView(setting: Setting): () => void {
		this.prepareFullWidthSetting(setting);
		this.choiceViewHandle?.destroy();
		const handle = mountComponent(setting.controlEl, ChoiceView, { app: this.app, plugin: this.plugin, choices: settingsStore.getState().choices, saveChoices: (choices: Plain<IChoice[]>) => { settingsStore.setState({ choices }); } });
		this.choiceViewHandle = handle;
		return () => { handle.destroy(); if (this.choiceViewHandle === handle) this.choiceViewHandle = null; };
	}

	private renderGlobalVariablesView(setting: Setting): () => void {
		this.prepareFullWidthSetting(setting);
		this.globalVariablesViewHandle?.destroy();
		const handle = mountComponent(setting.controlEl, GlobalVariablesView, { app: this.app, plugin: this.plugin });
		this.globalVariablesViewHandle = handle;
		return () => { handle.destroy(); if (this.globalVariablesViewHandle === handle) this.globalVariablesViewHandle = null; };
	}

	private renderPackages(setting: Setting): void {
		setting.addButton((button) => button.setButtonText(t("settings.packages.export")).onClick(() => {
			new ExportPackageModal(this.app, this.plugin, settingsStore.getState().choices).open();
		}));
		setting.addButton((button) => button.setButtonText(t("settings.packages.import")).onClick(() => {
			new ImportPackageModal(this.app).open();
		}));
	}

	private renderDateAliases(setting: Setting): void {
		setting.settingEl.addClass("qa-date-alias-setting");
		setting.controlEl.addClass("qa-date-alias-control");
		let textAreaRef: TextAreaComponent | null = null;
		setting.addTextArea((textArea) => {
			textAreaRef = textArea;
			textArea.setPlaceholder(t("settings.dateAliases.placeholder")).setValue(formatDateAliasLines(settingsStore.getState().dateAliases)).onChange((value) => {
				settingsStore.setState({ dateAliases: parseDateAliasLines(value) });
			});
			textArea.inputEl.addClass("qa-date-alias-input");
		});
		setting.addButton((button) => {
			button.setButtonText(t("settings.dateAliases.reset")).onClick(() => {
				settingsStore.setState({ dateAliases: DEFAULT_DATE_ALIASES });
				textAreaRef?.setValue(formatDateAliasLines(DEFAULT_DATE_ALIASES));
			});
			button.buttonEl.addClass("qa-date-alias-reset");
		});
	}

	private renderTemplateFolderPaths(setting: Setting): () => void {
		setting.settingEl.addClass("qa-template-folders-setting");
		const container = setting.controlEl.createDiv("qa-template-folders");
		const listEl = container.createDiv("qa-template-folder-list");
		const getPaths = (): string[] => normalizeTemplateFolderPaths(settingsStore.getState().templateFolderPaths);
		const setPaths = (paths: string[]): void => { settingsStore.setState({ templateFolderPaths: paths }); };
		const renderList = (): void => {
			listEl.empty();
			const paths = getPaths();
			if (paths.length === 0) {
				listEl.createDiv({ cls: "qa-template-folder-empty", text: t("settings.templateFolders.empty") });
				return;
			}
			for (const folder of paths) {
				const row = listEl.createDiv("qa-template-folder-row");
				row.createSpan({ cls: "qa-template-folder-name", text: folder, attr: { title: folder } });
				new ExtraButtonComponent(row).setIcon("trash-2").setTooltip(t("settings.templateFolders.remove", { folder })).onClick(() => {
					setPaths(getPaths().filter((f) => f !== folder));
					renderList();
				});
			}
		};
		const inputRow = container.createDiv("qa-template-folder-input-row");
		const input = new TextComponent(inputRow);
		input.setPlaceholder("templates/");
		input.inputEl.addClass("qa-template-folder-input");
		const suggester = new GenericTextSuggester(this.app, input.inputEl, sortFolderPathsByTree(getAllFolderPathsInVault(this.app)).filter((path) => path !== "/"));
		const addFolder = (): void => {
			const [folder] = normalizeTemplateFolderPaths([input.inputEl.value]);
			input.inputEl.value = "";
			if (!folder) return;
			const paths = getPaths();
			if (paths.includes(folder)) return;
			setPaths([...paths, folder]);
			renderList();
		};
		const onKeydown = (e: KeyboardEvent): void => { if (e.key === "Enter") { e.preventDefault(); addFolder(); } };
		input.inputEl.addEventListener("keydown", onKeydown);
		new ButtonComponent(inputRow).setCta().setButtonText(t("settings.templateFolders.add")).onClick(() => addFolder());
		renderList();
		return () => { input.inputEl.removeEventListener("keydown", onKeydown); suggester.destroy(); };
	}

	private renderDevInfo(setting: Setting): void {
		const infoContainer = setting.settingEl.createDiv();
		infoContainer.addClass("qa-dev-info");
		renderDevelopmentInfo(infoContainer, { branch: __DEV_GIT_BRANCH__, commit: __DEV_GIT_COMMIT__, dirty: __DEV_GIT_DIRTY__ });
	}
}
