import type {
	Alignments,
	ArrowDirections,
	ChartTheme,
	ChartTypes,
	ColorLegendType,
	DividerStatus,
	GaugeTypes,
	Projection,
	Statuses,
	TreeTypes
} from './enums'
import type {
	BarOptions,
	GridOptions,
	LegendOptions,
	StackedBarOptions,
	ToolbarOptions,
	TooltipOptions,
	ZoomBarsOptions,
	Locale,
	TabularRepCustomizationOptions
} from './components'
import type {
	AxesOptions,
	AxisOptions,
	BinnedAxisOptions,
	ComboChartAxisOptions,
	TimeScaleOptions
} from './axis-scales'

/**
 * Base chart options common to any chart
 */
export interface BaseChartOptions {
	/**
	 * Optionally specify a title for the chart
	 */
	title?: string
	/**
	 * Locale configuration
	 */
	locale?: Locale
	/**
	 * boolean to disable animations (enabled by default)
	 */
	animations?: boolean
	/**
	 * boolean to prevent the container from resizing
	 */
	resizable?: boolean
	/**
	 * Optionally specify a width for the chart
	 */
	width?: string
	/**
	 * Optionally specify a height for the chart
	 */
	height?: string
	/**
	 * Optionally specify a theme for the chart
	 */
	theme?: ChartTheme | string
	/**
	 * tooltip configuration
	 */
	tooltip?: TooltipOptions
	/**
	 * legend configuration
	 */
	legend?: LegendOptions
	/**
	 * toolbar configurations
	 */
	toolbar?: ToolbarOptions
	/**
	 * Optional function to determine whether is filled based on datasetLabel, label, and/or data
	 */
	getIsFilled?: (
		datasetLabel: string,
		label?: string,
		data?: any,
		defaultFilled?: boolean
	) => boolean
	/**
	 * Optional function to generate the fill color based on datasetLabel, label, and/or data
	 */
	getFillColor?: (group: string, label?: string, data?: any, defaultFillColor?: string) => string
	/**
	 * Optional function to generate the stroke color based on datasetLabel, label, and/or data
	 * (note) - not all chart types support the stroke color (e.g. wordcloud)
	 */
	getStrokeColor?: (
		group: string,
		label?: string,
		data?: any,
		defaultStrokeColor?: string
	) => string
	/**
	 * stylesheet options
	 */
	style?: {
		/**
		 * optional prefixing string for css classes (defaults to 'cc')
		 */
		prefix?: string
	}
	/**
	 * options related to charting data
	 */
	data?: {
		/**
		 * identifier for data groups
		 */
		groupMapsTo?: string
		/**
		 * used to simulate data loading in skeleton way
		 */
		loading?: boolean
		/**
		 * options related to pre-selected data groups
		 * Remains empty if every legend item is active or dataset doesn't have the data groups.
		 */
		selectedGroups?: string[]
	}
	/**
	 * options related to color scales
	 */
	color?: {
		/**
		 @example
		 { 'Dataset 1': 'blue' }
		 */
		scale?: object
		/**
		 * use a carbon dataviz preset color palette
		 * put the index (selection of which variant)
		 */
		pairing?: {
			/**
			 * the number of color variants in the palette (defaults to using the number of data groups in the given data)
			 */
			numberOfVariants?: number
			/**
			 * the option number of the color paring
			 */
			option?: number
		}
		/*
		 * options related to gradient
		 * e.g. { enabled: true }
		 */
		gradient?: {
			enabled?: boolean
			/**
			 * hex color array
			 * e.g. ['#fff', '#000', ...]
			 */
			colors?: Array<string>
		}
	}
	/*
	 * options related to (CSV|PNG|JPG) file downloads
	 */
	fileDownload?: {
		/**
		 * the number of color variants in the palette (defaults to using the number of data groups in the given data)
		 */
		fileName?: string | ((type: 'png' | 'jpg' | 'csv') => string)
	}
	/**
	 * whether this type of chart is experimental
	 */
	experimental?: boolean
	/**
	 * options related to table data customization
	 */
	tabularRepModal?: TabularRepCustomizationOptions
}

/**
 * Options common to any chart with an axis
 */
export interface AxisChartOptions extends BaseChartOptions {
	axes?: AxesOptions<AxisOptions>
	grid?: GridOptions
	timeScale?: TimeScaleOptions
	/**
	 * zoombar configuration
	 */
	zoomBar?: ZoomBarsOptions
}

/**
 * Options common to binned charts with an axis
 */
export interface BinnedAxisChartOptions extends AxisChartOptions {
	axes?: AxesOptions<BinnedAxisOptions>
	grid?: GridOptions
	timeScale?: TimeScaleOptions
	/**
	 * zoombar configuration
	 */
	zoomBar?: ZoomBarsOptions
}

/**
 * options specific to boxplot charts
 */
export type BoxplotChartOptions = AxisChartOptions

/**
 * options specific to bar charts
 */
export interface BarChartOptions extends AxisChartOptions {
	bars?: BarOptions
}

/**
 * options specific to stacked bar charts
 */
export interface StackedBarChartOptions extends BarChartOptions {
	bars?: StackedBarOptions
}

/**
 * options specific to scatter charts
 */
export interface ScatterChartOptions extends AxisChartOptions {
	/**
	 * options for the points
	 */
	points?: {
		/**
		 * sets the radius of the point
		 */
		radius: number
		fillOpacity?: number
		filled?: boolean
		enabled?: boolean
	}
}

/**
 * options specific to lollipop charts
 */
export type LollipopChartOptions = ScatterChartOptions

/**
 * options specific to bubble charts
 */
export interface BubbleChartOptions extends AxisChartOptions {
	/**
	 * options for the individual bubbles
	 */
	bubble?: {
		/**
		 * the key to lookup in charting data for the bubble radius value
		 */
		radiusMapsTo?: string
		/**
		 * options for what the bubble radius value maps to
		 */
		radiusLabel?: string
		/**
		 * A function that would determine the range of the bubble radius to use
		 * Returns an array with the 1st value being the min and the 2nd value being the max radius
		 */
		radiusRange?: (min: number, max: number) => number[]
		/**
		 * Opacity of the fills used within each circle
		 */
		fillOpacity?: number
		/**
		 * enabled scatter dot or not
		 */
		enabled?: boolean
	}
}

/**
 * options specific to bullet charts
 */
export interface BulletChartOptions extends AxisChartOptions {
	/**
	 * options for the individual bullets
	 */
	bullet?: {
		performanceAreaTitles?: string[]
	}
}

/**
 * options specific to histogram charts
 */
export interface HistogramChartOptions extends AxisChartOptions {
	/**
	 * options related to bins
	 */
	bins?: {
		rangeLabel?: string
	}
}

/**
 * options specific to line charts
 */
export interface LineChartOptions extends ScatterChartOptions {
	/**
	 * options for the curve of the line
	 */
	curve?: string | { name: string }
}

/**
 * options specific to area charts
 */
export interface AreaChartOptions extends AxisChartOptions {
	/**
	 * options for the curve of the line
	 */
	curve?: string | { name: string }
	/**
	 * options to bound the area of the chart
	 */
	bounds?: {
		upperBoundMapsTo?: string
		lowerBoundMapsTo?: string
	}
}

/**
 * options specific to area charts
 */
export interface StackedAreaChartOptions extends ScatterChartOptions {
	/**
	 * options for the curve of the line
	 */
	curve?: string | { name: string }
}

/**
 * options specific to world cloud charts
 */
export interface WordCloudChartTooltipOptions extends TooltipOptions {
	/** the label that shows up by the highlighted word in the tooltip */
	wordLabel?: string
	/** the label that shows up by the value of the highlighted word in the tooltip */
	valueLabel?: string
}

export interface WordCloudChartOptions extends BaseChartOptions {
	wordCloud?: {
		/** what key in your charting data will the font sizes map to? */
		fontSizeMapsTo?: string
		/** a function that'll decide the range of font sizes, e.g. [10, 80]
		 * @example
		 * (chartSize, data) => {}
		 * */
		fontSizeRange?: (chartSize: any, data: any) => object
		/** what key in your charting data will the words map to? */
		wordMapsTo?: string
	}
	/**
	 * tooltip configuration
	 */
	tooltip?: WordCloudChartTooltipOptions
}

/**
 * options specific to pie charts
 */
export interface PieChartOptions extends BaseChartOptions {
	pie?: {
		labels?: {
			formatter?: (data: any) => string
			enabled?: boolean
		}
		alignment?: Alignments | string
		/**
		 * identifier for value key in your charting data
		 * defaults to value
		 */
		valueMapsTo?: string
		sortFunction?: (
			a: { group: string; value: number },
			b: { group: string; value: number }
		) => number
	}
}

/**
 * options specific to gauge charts
 */
export interface GaugeChartOptions extends BaseChartOptions {
	gauge?: {
		arcWidth?: number
		deltaArrow?: {
			direction?: ArrowDirections | string
			size?: (value: number) => number | string
			enabled: boolean
		}
		showPercentageSymbol?: boolean
		status?: Statuses | string
		deltaFontSize?: (value: number) => number | string
		numberSpacing?: number
		numberFormatter?: (value: number) => string
		valueFontSize?: (value: number) => number | string
		type?: GaugeTypes | string
		alignment?: Alignments | string
	}
}

/**
 * options specific to donut charts
 */
export interface DonutChartOptions extends PieChartOptions {
	donut?: {
		center?: {
			label?: string
			number?: number
			numberFontSize?: (value: number) => number | string
			titleFontSize?: (value: number) => number | string
			titleYPosition?: (value: number) => number
			numberFormatter?: (value: number) => string
		}
		alignment?: Alignments | string
	}
}

export interface MeterChartOptions extends BaseChartOptions {
	meter?: {
		showLabels?: boolean
		proportional?: {
			total?: number
			unit?: string
		}
		peak?: number
		status?: {
			ranges: Array<{
				range: [number, number]
				status: Statuses | string
			}>
		}
		height?: number
		title?: {
			percentageIndicator?: {
				/**
				 * rendering of the percentage value relative to the dataset within title
				 */
				enabled?: boolean
			}
		}
	}
}

export interface ProportionalMeterChartOptions extends BaseChartOptions {
	meter?: {
		proportional?: {
			total?: number
			unit?: string
		}
	}
}

/**
 * options specific to radar charts
 */
export interface RadarChartOptions extends BaseChartOptions {
	radar?: {
		axes: {
			angle: string
			value: string
		}
		alignment?: Alignments | string
	}
}

/**
 * options specific to combo charts
 */
export interface ComboChartOptions extends AxisChartOptions {
	axes?: AxesOptions<ComboChartAxisOptions>
	comboChartTypes: Array<{
		type: ChartTypes | string
		options?: object
		correspondingDatasets: Array<string>
	}>
}

/*
 * options specific to treemap charts
 */
export type TreemapChartOptions = BaseChartOptions

/*
 * options specific to tree charts
 */
export interface TreeChartOptions extends BaseChartOptions {
	tree?: {
		type?: TreeTypes | string
		rootTitle?: string
	}
}

/*
 * options specific to circle pack charts
 */
export interface CirclePackChartOptions extends BaseChartOptions {
	circlePack?: {
		circles: {
			fillOpacity: number
		}
		// depth of nodes to display
		hierachyLevel: number
		padding?: {
			outer?: number
			inner?: number
		}
	}
}

/**
 * options specific to Alluvial charts
 */
export interface AlluvialChartOptions extends BaseChartOptions {
	alluvial: {
		units?: string
		/**
		 * List of nodes to draw
		 */
		nodes: Array<{
			name: string
			category?: string
		}>
		/**
		 * Node alignment (Default is center)
		 */
		nodeAlignment?: Alignments | string
		/**
		 * Set the node padding
		 */
		nodePadding?: number
		/**
		 * Enable single color usage for lines
		 */
		monochrome?: boolean
	}
}

/**
 * options specific to Heatmap charts
 */
export interface HeatmapChartOptions extends BaseChartOptions {
	heatmap: {
		/**
		 * Divider width state - will default to auto
		 * No cell divider for cell dimensions less than 16
		 */
		divider?: {
			state?: DividerStatus | string
		}
		/**
		 * customize color legend
		 * enabled by default on select charts
		 */
		colorLegend?: {
			/**
			 * Text to display beside or on top of the legend
			 * Position is determined by text length
			 */
			title?: string
			type: ColorLegendType | string
		}
	}
}

/**
 * Options common to any thematic chart
 */
export interface ThematicChartOptions extends BaseChartOptions {
	thematic: {
		projection: Projection | string
	}
}

/**
 * Options common to any thematic chart
 */
export interface ChoroplethChartOptions extends ThematicChartOptions {
	choropleth: {
		/**
		 * customize color legend
		 * enabled by default on select charts
		 */
		colorLegend?: {
			/**
			 * Text to display beside or on top of the legend
			 * Position is determined by text length
			 */
			title?: string
			type: ColorLegendType | string
		}
	}
}

export type WorldCloudChartOptions = WordCloudChartOptions

export type ChartOptions =
	| AlluvialChartOptions
	| AreaChartOptions
	| BarChartOptions
	| BoxplotChartOptions
	| BubbleChartOptions
	| BulletChartOptions
	| CirclePackChartOptions
	| ComboChartOptions
	| DonutChartOptions
	| GaugeChartOptions
	| HeatmapChartOptions
	| HistogramChartOptions
	| LineChartOptions
	| LollipopChartOptions
	| MeterChartOptions
	| PieChartOptions
	| RadarChartOptions
	| ScatterChartOptions
	| StackedAreaChartOptions
	| StackedBarChartOptions
	| TreeChartOptions
	| TreemapChartOptions
	| WordCloudChartOptions
	| WorldCloudChartOptions
