<script lang="ts">
    import { t } from "../../i18n";
    import IconButton from "../components/IconButton.svelte";
    import DragHandle from "../components/DragHandle.svelte";

    let {
        dragDisabled,
        showConfigureButton = true,
        showDuplicateButton = true,
        commandEnabled = false,
        choiceName = "",
        onDeleteChoice,
        onConfigureChoice,
        onToggleCommand,
        onDuplicateChoice,
        onDragHandleDown,
        onMoveUp,
        onMoveDown,
        onOpenMenu,
    }: {
        dragDisabled: boolean;
        showConfigureButton?: boolean;
        showDuplicateButton?: boolean;
        commandEnabled?: boolean;
        choiceName?: string;
        onDeleteChoice: () => void;
        onConfigureChoice: () => void;
        onToggleCommand: () => void;
        onDuplicateChoice: () => void;
        onDragHandleDown: (e?: Event) => void;
        onMoveUp?: () => void;
        onMoveDown?: () => void;
        onOpenMenu?: (anchor: HTMLElement) => void;
    } = $props();

    const commandPaletteLabel = $derived(
        choiceName ? `${t("choices.commandPalette")}: ${choiceName}` : t("choices.commandPalette"),
    );
    const configureLabel = $derived(
        choiceName ? t("choices.configureNamed", { name: choiceName }) : t("choices.configure"),
    );
    const duplicateLabel = $derived(
        choiceName ? t("choices.duplicateNamed", { name: choiceName }) : t("choices.duplicate"),
    );
    const deleteLabel = $derived(
        choiceName ? t("choices.deleteNamed", { name: choiceName }) : t("choices.delete"),
    );
    const moreOptionsLabel = $derived(
        choiceName ? t("choices.moreOptionsFor", { name: choiceName }) : t("choices.moreOptions"),
    );
    const reorderLabel = $derived(
        choiceName ? t("choices.reorderNamed", { name: choiceName }) : t("choices.reorder"),
    );
</script>

<div class="rightButtonsContainer">
    <IconButton
        iconId="zap"
        ariaPressed={commandEnabled}
        label={commandPaletteLabel}
        extraClass="qa-row-secondary-action"
        onclick={onToggleCommand}
    />
    {#if showConfigureButton}
        <IconButton
            iconId="settings"
            label={configureLabel}
            extraClass="qa-row-secondary-action"
            onclick={onConfigureChoice}
        />
    {/if}

    {#if showDuplicateButton}
        <IconButton
            iconId="copy"
            label={duplicateLabel}
            extraClass="qa-row-secondary-action"
            onclick={onDuplicateChoice}
        />
    {/if}

    <IconButton
        iconId="trash-2"
        label={deleteLabel}
        extraClass="qa-row-secondary-action"
        onclick={onDeleteChoice}
    />

    {#if onOpenMenu}
        <IconButton
            iconId="more-vertical"
            ariaHasPopup="menu"
            label={moreOptionsLabel}
            onclick={(e) => onOpenMenu?.(e.currentTarget as HTMLElement)}
        />
    {/if}

    <DragHandle
        label={reorderLabel}
        {dragDisabled}
        onDragStart={onDragHandleDown}
        {onMoveUp}
        {onMoveDown}
    />
</div>

<style>
.rightButtonsContainer {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
