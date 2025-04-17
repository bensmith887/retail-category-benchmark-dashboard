
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryNode {
  id: string;
  name: string;
  competitor: string;
  count: number;
  children?: CategoryNode[];
}

interface AssortmentTreeViewProps {
  data: CategoryNode[];
  onSelectCategory: (category: CategoryNode) => void;
}

export const AssortmentTreeView: React.FC<AssortmentTreeViewProps> = ({ data, onSelectCategory }) => {
  return (
    <div className="p-2 overflow-auto max-h-[600px]">
      {data.map((item) => (
        <TreeNode key={item.id} node={item} onSelectCategory={onSelectCategory} level={0} />
      ))}
    </div>
  );
};

interface TreeNodeProps {
  node: CategoryNode;
  level: number;
  onSelectCategory: (category: CategoryNode) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, onSelectCategory }) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const hasChildren = node.children && node.children.length > 0;
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  const handleSelect = () => {
    onSelectCategory(node);
  };
  
  const competitorColors: Record<string, string> = {
    "Your Brand": "text-purple-500",
    "Amazon": "text-amber-500",
    "Walmart": "text-blue-600",
    "Target": "text-red-600",
    "eBay": "text-red-500",
    "Best Buy": "text-blue-500"
  };
  
  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-gray-100",
          level > 0 && "ml-5"
        )}
        onClick={handleSelect}
      >
        <div className="mr-1 w-5" onClick={handleToggle}>
          {hasChildren && (
            isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
        </div>
        {hasChildren ? (
          <Folder size={16} className="mr-2" />
        ) : (
          <Package size={16} className="mr-2" />
        )}
        <span className="flex-grow">{node.name}</span>
        <span className={cn("font-medium", competitorColors[node.competitor] || "text-gray-500")}>
          ({node.count})
        </span>
      </div>
      
      {isExpanded && hasChildren && (
        <div className="ml-4">
          {node.children!.map((child) => (
            <TreeNode 
              key={child.id} 
              node={child} 
              level={level + 1}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};
