// v2 component exports — Z Design System
//
// Source of truth: brand/system/v2/brand-direction-v2.md
// Tokens:         packages/ui/src/styles/tokens.css
// Visual ref:     apps/preview/v2.html

// Foundation primitives
export { Tooltip } from "./components/Tooltip";
export type { TooltipProps } from "./components/Tooltip";
export { CopyButton } from "./components/CopyButton";
export type { CopyButtonProps } from "./components/CopyButton";
export { HashChip } from "./components/HashChip";
export type { HashChipProps } from "./components/HashChip";
export { AddressLabel } from "./components/AddressLabel";
export type { AddressLabelProps } from "./components/AddressLabel";

// Display
export { TypeBadge } from "./components/TypeBadge";
export type { TypeBadgeProps } from "./components/TypeBadge";
export { InlineNotice } from "./components/InlineNotice";
export type { InlineNoticeProps } from "./components/InlineNotice";
export { SectionLabel } from "./components/SectionLabel";
export type { SectionLabelProps } from "./components/SectionLabel";
export { ActionBanner } from "./components/ActionBanner";
export type { ActionBannerProps } from "./components/ActionBanner";
export { KeyValueGrid } from "./components/KeyValueGrid";
export type { KeyValueGridProps, KeyValueRow } from "./components/KeyValueGrid";
export { PageHeader } from "./components/PageHeader";
export type { PageHeaderProps } from "./components/PageHeader";
export { DataCard } from "./components/DataCard";
export type { DataCardProps } from "./components/DataCard";
export { MetricCard } from "./components/MetricCard";
export type { MetricCardProps } from "./components/MetricCard";
export { StatusBadge } from "./components/StatusBadge";
export type { StatusBadgeProps } from "./components/StatusBadge";
export { CanvasActionBar } from "./components/CanvasActionBar";
export type { CanvasActionBarProps } from "./components/CanvasActionBar";
export { FlowNodeCard } from "./components/FlowNodeCard";
export type { FlowNodeCardProps, FlowNodeTone } from "./components/FlowNodeCard";

// Data
export { DataTable } from "./components/DataTable";
export type { DataTableProps, DataColumn, DataRow } from "./components/DataTable";
export { ColumnHeader } from "./components/ColumnHeader";
export type { ColumnHeaderProps } from "./components/ColumnHeader";
export { Pagination } from "./components/Pagination";
export type { PaginationProps } from "./components/Pagination";
export { ExpandableRow } from "./components/ExpandableRow";
export type { ExpandableRowProps } from "./components/ExpandableRow";

// Controls + brand primitives
export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";
export { Chip } from "./components/Chip";
export type { ChipProps } from "./components/Chip";
export { TextField } from "./components/TextField";
export type { TextFieldProps } from "./components/TextField";
export { SelectField } from "./components/SelectField";
export type { SelectFieldProps, SelectOption } from "./components/SelectField";
export { AmountField } from "./components/AmountField";
export type { AmountFieldProps } from "./components/AmountField";
export { PresetButtonGroup } from "./components/PresetButtonGroup";
export type { PresetButtonGroupProps, PresetOption } from "./components/PresetButtonGroup";
export { Tabs } from "./components/Tabs";
export type { TabsProps, TabItem } from "./components/Tabs";
export { IconButton } from "./components/IconButton";
export type { IconButtonProps } from "./components/IconButton";
export { LogoMark } from "./components/LogoMark";
export type { LogoMarkProps } from "./components/LogoMark";
export { MicroBadge } from "./components/MicroBadge";
export type { MicroBadgeProps } from "./components/MicroBadge";
export { AssetPill } from "./components/AssetPill";
export type { AssetPillProps } from "./components/AssetPill";
export { StatTile } from "./components/StatTile";
export type { StatTileProps } from "./components/StatTile";
export { WalletState } from "./components/WalletState";
export type { WalletStateProps } from "./components/WalletState";
export { SideNav } from "./components/SideNav";
export type { SideNavProps, SideNavItem } from "./components/SideNav";

// Shell (Tier 3)
export { AppHeader, AppHeaderLink } from "./components/AppHeader";
export type { AppHeaderProps, AppHeaderLinkProps } from "./components/AppHeader";
export { SearchField } from "./components/SearchField";
export type { SearchFieldProps } from "./components/SearchField";
export { Footer } from "./components/Footer";
export type { FooterProps, FooterColumn, FooterSocial } from "./components/Footer";
export { ChainSwitcher } from "./components/ChainSwitcher";
export type { ChainSwitcherProps, ChainOption } from "./components/ChainSwitcher";
export { ThemeToggle } from "./components/ThemeToggle";
export type { ThemeToggleProps } from "./components/ThemeToggle";

// Charts (Tier 2)
export { ChartTooltip } from "./components/charts/ChartTooltip";
export type { ChartTooltipProps, ChartTooltipSeries } from "./components/charts/ChartTooltip";
export { ChartLegend } from "./components/charts/ChartLegend";
export type { ChartLegendProps, ChartLegendItem } from "./components/charts/ChartLegend";
export { AxisLabel } from "./components/charts/AxisLabel";
export type { AxisLabelProps } from "./components/charts/AxisLabel";
export { Sparkline } from "./components/charts/Sparkline";
export type { SparklineProps } from "./components/charts/Sparkline";
export { LineChart } from "./components/charts/LineChart";
export type { LineChartProps, LineSeries } from "./components/charts/LineChart";
export { AreaChart } from "./components/charts/AreaChart";
export type { AreaChartProps, AreaSeries } from "./components/charts/AreaChart";
export { BarChart } from "./components/charts/BarChart";
export type { BarChartProps, BarSeries } from "./components/charts/BarChart";
export { DonutChart } from "./components/charts/DonutChart";
export type { DonutChartProps, DonutSegment } from "./components/charts/DonutChart";

// Product modules
export { TokenInput } from "./components/TokenInput";
export type { TokenInputProps } from "./components/TokenInput";
export { QuoteCard } from "./components/QuoteCard";
export type { QuoteCardProps, QuoteRow } from "./components/QuoteCard";
export { TransactionStepper } from "./components/TransactionStepper";
export type { TransactionStepperProps, TransactionStep, StepState } from "./components/TransactionStepper";
export { RiskCallout } from "./components/RiskCallout";
export type { RiskCalloutProps } from "./components/RiskCallout";
export { MarketRow } from "./components/MarketRow";
export type { MarketRowProps } from "./components/MarketRow";
export { PositionCard } from "./components/PositionCard";
export type { PositionCardProps, PositionStat } from "./components/PositionCard";
export { PrimaryActionBar } from "./components/PrimaryActionBar";
export type { PrimaryActionBarProps } from "./components/PrimaryActionBar";
export { ResultCard } from "./components/ResultCard";
export type { ResultCardProps } from "./components/ResultCard";
export { ModalCard } from "./components/ModalCard";
export type { ModalCardProps } from "./components/ModalCard";

// Feedback + guidance (v2.1)
export { UsageMeter } from "./components/UsageMeter";
export type { UsageMeterProps, UsageTone } from "./components/UsageMeter";
export { ProcessSteps } from "./components/ProcessSteps";
export type { ProcessStepsProps, ProcessStep, ProcessStepState } from "./components/ProcessSteps";
export { RecoveryNotice } from "./components/RecoveryNotice";
export type { RecoveryNoticeProps, RecoveryTone } from "./components/RecoveryNotice";
export { Coachmark } from "./components/Coachmark";
export type { CoachmarkProps, CoachmarkPlacement } from "./components/Coachmark";
