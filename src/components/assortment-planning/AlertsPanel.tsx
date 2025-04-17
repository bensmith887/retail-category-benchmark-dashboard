
import React from 'react';
import { X, AlertTriangle, ArrowRight, Zap, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Alert {
  id: number;
  title: string;
  category: string;
  competitor: string;
  date: string;
  score: number;
  type: 'gap' | 'opportunity' | 'exclusivity';
}

interface AlertsPanelProps {
  alerts: Alert[];
  onClose: () => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, onClose }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'gap':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'opportunity':
        return <Zap className="h-4 w-4 text-green-500" />;
      case 'exclusivity':
        return <Filter className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getAlertClass = (type: string) => {
    switch (type) {
      case 'gap':
        return 'border-l-yellow-500';
      case 'opportunity':
        return 'border-l-green-500';
      case 'exclusivity':
        return 'border-l-blue-500';
      default:
        return 'border-l-yellow-500';
    }
  };

  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <span>Recent Alerts ({alerts.length})</span>
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[320px] pr-4">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 border-l-4 rounded-md border bg-card ${getAlertClass(alert.type)}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getAlertIcon(alert.type)}
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {alert.category} • {alert.competitor}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Score: {alert.score}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {alert.date}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
