// src/pages/manager/tabs/SettingsTab.tsx
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Switch } from '../components/Switch';
import { useState } from 'react';

export const SettingsTab = () => {
  const [autoAssign, setAutoAssign] = useState(true);
  return (
    <div className="max-w-4xl">
      <Card className="p-8">
        <h3 className="text-2xl font-bold mb-8">Manager Settings</h3>

        <div className="space-y-6">
          <div>
            <label className="text-lg font-medium">Auto-Assign New Meters</label>
            <div className="mt-3 flex items-center gap-4">
              <Switch id="auto-assign"checked={autoAssign}
  onCheckedChange={setAutoAssign}/>
              <label htmlFor="auto-assign" className="text-gray-600">
                Automatically assign new meters in region
              </label>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h4 className="font-semibold mb-4">Danger Zone</h4>
            <Button variant="destructive">Deactivate Manager Account</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};