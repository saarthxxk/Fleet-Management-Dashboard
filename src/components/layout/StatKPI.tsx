import { useFleetStore } from '../../store/useFleetStore'

interface KpiTileProps {
  label: string
  value: number
  color?: string
}

function KpiTile({ label, value, color = 'var(--color-text-primary)' }: KpiTileProps) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2" style={{ borderRight: '1px solid var(--color-surface-border)' }}>
      <span className="text-lg font-bold leading-none" style={{ color, fontFamily: 'var(--font-mono)' }}>
        {value}
      </span>
      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </span>
    </div>
  )
}

export function StatKPI() {
  const vehicles = useFleetStore((s) => s.vehicles)
  const alerts   = useFleetStore((s) => s.alerts)

  const total   = vehicles.length
  const active  = vehicles.filter((v) => v.is_active).length
  const offline = vehicles.filter((v) => !v.is_active || v.health_status === 'offline').length
  const openAlerts = alerts.length  // store already holds unresolved only

  return (
    <div
      className="flex items-stretch"
      style={{ borderBottom: '1px solid var(--color-surface-border)' }}
    >
      <KpiTile label="Total" value={total} />
      <KpiTile label="Active" value={active} color="var(--color-ok)" />
      <KpiTile label="Alerts" value={openAlerts} color={openAlerts > 0 ? 'var(--color-warning)' : 'var(--color-text-primary)'} />
      <div className="flex flex-col gap-0.5 px-3 py-2">
        <span className="text-lg font-bold leading-none" style={{ color: offline > 0 ? 'var(--color-offline)' : 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
          {offline}
        </span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Offline</span>
      </div>
    </div>
  )
}