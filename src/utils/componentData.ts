import { CarbonComponent } from '../types/carbon.js';

/**
 * Carbon component database containing implementation details
 */
export const CARBON_COMPONENTS: Record<string, CarbonComponent> = {
  carbonButton: {
    name: 'carbonButton',
    category: 'form',
    description: 'A versatile button component that follows Carbon Design System guidelines with support for different variants, sizes, and states.',
    properties: [
      {
        name: 'label',
        type: 'string',
        required: true,
        description: 'The text label displayed on the button'
      },
      {
        name: 'variant',
        type: 'string',
        required: false,
        default: 'primary',
        description: 'Button appearance variant',
        options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'danger-tertiary', 'danger-ghost']
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        default: 'medium',
        description: 'Button size',
        options: ['small', 'medium', 'large', 'extra-large']
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Whether the button is disabled'
      },
      {
        name: 'icon-name',
        type: 'string',
        required: false,
        description: 'Carbon icon name to display alongside label'
      },
      {
        name: 'icon-position',
        type: 'string',
        required: false,
        default: 'left',
        description: 'Position of the icon relative to label',
        options: ['left', 'right']
      },
      {
        name: 'href',
        type: 'string',
        required: false,
        description: 'URL for link-style buttons'
      },
      {
        name: 'target',
        type: 'string',
        required: false,
        description: 'Target attribute for link buttons',
        options: ['_blank', '_self', '_parent', '_top']
      }
    ],
    events: [
      {
        name: 'click',
        description: 'Fired when the button is clicked',
        payload: 'CustomEvent with button details'
      }
    ],
    slots: [],
    examples: [
      {
        title: 'Basic Primary Button',
        description: 'A standard primary button with text label',
        code: {
          html: `<c-carbon-button label="Primary Button"></c-carbon-button>`,
          javascript: `import { LightningElement } from 'lwc';

export default class Example extends LightningElement {
    handleButtonClick(event) {
        console.log('Button clicked:', event.detail);
    }
}`
        }
      },
      {
        title: 'Button with Icon',
        description: 'A button with an icon positioned to the left of the label',
        code: {
          html: `<c-carbon-button 
    label="Add Item" 
    icon-name="add" 
    variant="primary">
</c-carbon-button>`,
          javascript: `import { LightningElement } from 'lwc';

export default class ExampleWithIcon extends LightningElement {
    // Component logic here
}`
        }
      }
    ],
    accessibility: {
      wcagLevel: 'AA',
      keyboardSupport: ['Enter', 'Space'],
      screenReaderSupport: 'Full support with proper labeling and state announcements',
      colorContrast: true,
      focusManagement: 'Receives focus in tab order, clear focus indicator'
    },
    migration: {
      from: ['lightning-button', 'button', 'input[type="button"]'],
      complexity: 'low',
      steps: [
        {
          step: 1,
          title: 'Replace component tag',
          description: 'Change lightning-button or standard button to c-carbon-button',
          code: {
            before: '<lightning-button label="Click me" onclick={handleClick}></lightning-button>',
            after: '<c-carbon-button label="Click me" onclick={handleClick}></c-carbon-button>'
          }
        },
        {
          step: 2,
          title: 'Update variant properties',
          description: 'Map Lightning button variants to Carbon variants',
          code: {
            before: '<lightning-button variant="brand" label="Submit"></lightning-button>',
            after: '<c-carbon-button variant="primary" label="Submit"></c-carbon-button>'
          }
        }
      ],
      codeChanges: [
        {
          type: 'property',
          from: 'variant="brand"',
          to: 'variant="primary"',
          reason: 'Carbon uses different variant naming convention'
        },
        {
          type: 'property',
          from: 'variant="neutral"',
          to: 'variant="secondary"',
          reason: 'Neutral maps to secondary in Carbon'
        }
      ],
      commonIssues: [
        'Icon names may need to be updated to Carbon icon names',
        'Custom CSS may need adjustment for Carbon styling',
        'Event handling remains the same but event.detail structure may differ'
      ]
    }
  },

  carbonDataTable: {
    name: 'carbonDataTable',
    category: 'data',
    description: 'A comprehensive data table component with sorting, selection, pagination, and batch actions following Carbon Design System patterns.',
    properties: [
      {
        name: 'data',
        type: 'Array',
        required: true,
        description: 'Array of data objects to display in the table'
      },
      {
        name: 'columns',
        type: 'Array',
        required: true,
        description: 'Array of column configuration objects'
      },
      {
        name: 'selectable',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Enable row selection with checkboxes'
      },
      {
        name: 'sortable',
        type: 'boolean',
        required: false,
        default: true,
        description: 'Enable column sorting'
      },
      {
        name: 'sticky-header',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Make table header sticky on scroll'
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        default: 'medium',
        description: 'Table row height',
        options: ['compact', 'short', 'medium', 'tall']
      },
      {
        name: 'zebra-stripes',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Alternate row background colors'
      }
    ],
    events: [
      {
        name: 'rowselection',
        description: 'Fired when row selection changes',
        payload: 'Array of selected row data'
      },
      {
        name: 'sort',
        description: 'Fired when column sorting is triggered',
        payload: 'Object with column and direction'
      }
    ],
    slots: [],
    examples: [
      {
        title: 'Basic Data Table',
        description: 'Simple data table with sortable columns',
        code: {
          html: `<c-carbon-data-table 
    data={tableData} 
    columns={tableColumns}>
</c-carbon-data-table>`,
          javascript: `import { LightningElement } from 'lwc';

export default class DataTableExample extends LightningElement {
    tableData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
    ];

    tableColumns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'status', label: 'Status', sortable: false }
    ];
}`
        }
      }
    ],
    accessibility: {
      wcagLevel: 'AA',
      keyboardSupport: ['Arrow keys', 'Enter', 'Space', 'Tab'],
      screenReaderSupport: 'Full support with proper table semantics and row/column headers',
      colorContrast: true,
      focusManagement: 'Keyboard navigation through cells and interactive elements'
    },
    migration: {
      from: ['lightning-datatable', 'table'],
      complexity: 'medium',
      steps: [
        {
          step: 1,
          title: 'Update component reference',
          description: 'Replace lightning-datatable with c-carbon-data-table'
        },
        {
          step: 2,
          title: 'Restructure column definitions',
          description: 'Update column configuration to match Carbon format'
        },
        {
          step: 3,
          title: 'Update event handlers',
          description: 'Modify event handling for Carbon-specific events'
        }
      ],
      codeChanges: [
        {
          type: 'property',
          from: 'key-field',
          to: 'row-key',
          reason: 'Different property name for unique row identifier'
        }
      ],
      commonIssues: [
        'Column type definitions need updating',
        'Custom cell renderers require different implementation',
        'Action menus have different API'
      ]
    }
  },

  carbonModal: {
    name: 'carbonModal',
    category: 'layout',
    description: 'A modal dialog component that provides focus management, accessibility, and follows Carbon Design System patterns.',
    properties: [
      {
        name: 'open',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Controls modal visibility'
      },
      {
        name: 'modal-heading',
        type: 'string',
        required: true,
        description: 'Title text for the modal header'
      },
      {
        name: 'modal-label',
        type: 'string',
        required: false,
        description: 'Optional label above the heading'
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        default: 'medium',
        description: 'Modal size',
        options: ['small', 'medium', 'large']
      },
      {
        name: 'primary-button-text',
        type: 'string',
        required: false,
        default: 'Save',
        description: 'Text for primary action button'
      },
      {
        name: 'secondary-button-text',
        type: 'string',
        required: false,
        default: 'Cancel',
        description: 'Text for secondary action button'
      },
      {
        name: 'danger',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Use danger variant styling'
      }
    ],
    events: [
      {
        name: 'close',
        description: 'Fired when modal is closed',
        payload: 'Event with close reason'
      },
      {
        name: 'primaryaction',
        description: 'Fired when primary button is clicked'
      },
      {
        name: 'secondaryaction',
        description: 'Fired when secondary button is clicked'
      }
    ],
    slots: [
      {
        name: 'body',
        description: 'Main content area of the modal',
        required: true
      }
    ],
    examples: [
      {
        title: 'Basic Modal',
        description: 'Simple modal with header and body content',
        code: {
          html: `<c-carbon-modal 
    open={isModalOpen}
    modal-heading="Confirm Action"
    onclose={handleModalClose}
    onprimaryaction={handleSave}>
    <div slot="body">
        <p>Are you sure you want to perform this action?</p>
    </div>
</c-carbon-modal>`,
          javascript: `import { LightningElement, track } from 'lwc';

export default class ModalExample extends LightningElement {
    @track isModalOpen = false;

    openModal() {
        this.isModalOpen = true;
    }

    handleModalClose() {
        this.isModalOpen = false;
    }

    handleSave() {
        // Perform save action
        this.isModalOpen = false;
    }
}`
        }
      }
    ],
    accessibility: {
      wcagLevel: 'AA',
      keyboardSupport: ['Escape', 'Tab', 'Enter'],
      screenReaderSupport: 'Full support with proper dialog semantics and focus management',
      colorContrast: true,
      focusManagement: 'Traps focus within modal, returns focus to trigger element on close'
    }
  }
};

/**
 * Get component details by name
 */
export function getComponentDetails(componentName: string): CarbonComponent | null {
  const normalizedName = componentName.toLowerCase();
  return CARBON_COMPONENTS[normalizedName] || null;
}

/**
 * Get all component names
 */
export function getAllComponentNames(): string[] {
  return Object.keys(CARBON_COMPONENTS);
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: string): CarbonComponent[] {
  return Object.values(CARBON_COMPONENTS).filter(
    component => component.category === category
  );
}

/**
 * Search components by name or description
 */
export function searchComponents(query: string): CarbonComponent[] {
  const searchTerm = query.toLowerCase();
  return Object.values(CARBON_COMPONENTS).filter(
    component => 
      component.name.toLowerCase().includes(searchTerm) ||
      component.description.toLowerCase().includes(searchTerm)
  );
}