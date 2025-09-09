export default function DesignSystemDemo() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      {/* Typography Section */}
      <section>
        <h2 className="text-heading-2 mb-6">Typography System</h2>
        <div className="space-y-4">
          <h1 className="text-heading-1">Heading 1 - 48px Bold</h1>
          <h2 className="text-heading-2">Heading 2 - 32px Bold</h2>
          <h3 className="text-heading-3">Heading 3 - 24px SemiBold</h3>
          <h4 className="text-heading-4">Heading 4 - 18px SemiBold</h4>
          <h5 className="text-heading-5">Heading 5 - 16px SemiBold</h5>
          <p className="text-body-large">
            Body Large - 16px Regular with 24px line height
          </p>
          <p className="text-body-medium">
            Body Medium - 14px Regular with 20px line height
          </p>
          <p className="text-body-small">
            Body Small - 12px Regular with 16px line height
          </p>
        </div>
      </section>

      {/* Color Palette Section */}
      <section>
        <h2 className="text-heading-2 mb-6">Color Palette</h2>

        {/* Primary Colors */}
        <div className="mb-8">
          <h3 className="text-heading-4 mb-4">Primary Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="bg-primary h-20 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Primary</p>
              <p className="text-body-small text-secondary">#111111</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-dark h-20 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Primary Dark</p>
              <p className="text-body-small text-secondary">#000000</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-light h-20 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Primary Light</p>
              <p className="text-body-small text-secondary">#3D3D3D</p>
            </div>
            <div className="text-center">
              <div className="bg-white border border-gray-300 h-20 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">White</p>
              <p className="text-body-small text-secondary">#FFFFFF</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary h-20 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Secondary</p>
              <p className="text-body-small text-secondary">#737373</p>
            </div>
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="mb-8">
          <h3 className="text-heading-4 mb-4">Semantic Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-success h-20 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Success</p>
              <p className="text-body-small text-secondary">#22C55E</p>
            </div>
            <div className="text-center">
              <div className="bg-error h-20 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Error</p>
              <p className="text-body-small text-secondary">#EF4444</p>
            </div>
            <div className="text-center">
              <div className="bg-warning h-20 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Warning</p>
              <p className="text-body-small text-secondary">#F59E0B</p>
            </div>
            <div className="text-center">
              <div className="bg-info h-20 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Info</p>
              <p className="text-body-small text-secondary">#3B82F6</p>
            </div>
          </div>
        </div>

        {/* Gray Scale */}
        <div>
          <h3 className="text-heading-4 mb-4">Gray Scale</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="bg-gray-50 border border-gray-300 h-16 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Gray 50</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 h-16 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Gray 100</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-16 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Gray 200</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-300 h-16 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Gray 300</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-400 h-16 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Gray 400</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-600 h-16 w-full rounded-lg mb-2"></div>
              <p className="text-body-small">Gray 600</p>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section>
        <h2 className="text-heading-2 mb-6">Components</h2>

        {/* Buttons */}
        <div className="mb-8">
          <h3 className="text-heading-4 mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-outline">Outline Button</button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-8">
          <h3 className="text-heading-4 mb-4">Cards</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-base p-6">
              <h4 className="text-heading-5 mb-2">Base Card</h4>
              <p className="text-body-medium text-secondary">
                This is a base card with subtle border and light shadow.
              </p>
            </div>
            <div className="card-elevated p-6">
              <h4 className="text-heading-5 mb-2">Elevated Card</h4>
              <p className="text-body-medium text-secondary">
                This is an elevated card with more prominent shadow.
              </p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="mb-8">
          <h3 className="text-heading-4 mb-4">Input Fields</h3>
          <div className="max-w-md space-y-4">
            <input
              type="text"
              placeholder="Enter your name..."
              className="input-base"
            />
            <input
              type="email"
              placeholder="Enter your email..."
              className="input-base"
            />
          </div>
        </div>

        {/* Status Badges */}
        <div>
          <h3 className="text-heading-4 mb-4">Status Badges</h3>
          <div className="flex flex-wrap gap-3">
            <span className="status-success">Success</span>
            <span className="status-error">Error</span>
            <span className="status-warning">Warning</span>
            <span className="status-info">Info</span>
          </div>
        </div>
      </section>
    </div>
  )
}
