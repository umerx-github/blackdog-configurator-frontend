import React, { useEffect } from "react";
import DragAndDropRepeaterInput from "./drag-and-drop/DragAndDropRepeaterInput";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { Item } from "../../../interfaces/components/inputs/drag-and-drop";

interface SymbolRepeaterProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	symbolIds: number[];
	setSymbolIds: (symbolIds: number[]) => void;
}

export default function SymbolRepeater({
	blackdogConfiguratorClient,
	symbolIds,
	setSymbolIds,
}: SymbolRepeaterProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [availableItems, setAvailableItems] = React.useState<Item[]>([]);
	useEffect(() => {
		(async () => {
			const symbols = await blackdogConfiguratorClient
				.symbol()
				.getMany({});
			setAvailableItems(
				symbols.map((symbol) => ({
					itemId: symbol.id.toString(),
					itemValue: symbol.name,
				}))
			);
			setIsLoading(false);
		})();
	}, [symbolIds]);
	return (
		<DragAndDropRepeaterInput
			droppableId="symbol-repeater"
			isLoading={isLoading}
			availableItems={availableItems.filter((item) => {
				return !symbolIds.includes(parseInt(item.itemId));
			})}
			selectedItems={symbolIds.reduce((acc, id) => {
				const symbol = availableItems.find(
					(item) => item.itemId === id.toString()
				);
				if (symbol) {
					acc.push(symbol);
				}
				return acc;
			}, [] as Item[])}
			onCreate={async (inputValue) => {
				(async () => {
					setIsLoading(true);
					const newSymbol = await blackdogConfiguratorClient
						.symbol()
						.postMany([
							{
								name: inputValue,
							},
						]);
					setSymbolIds([...symbolIds, newSymbol[0].id]);
				})();
			}}
			onAdd={(item) => {
				setIsLoading(true);
				setSymbolIds([...symbolIds, parseInt(item.itemId)]);
			}}
			onDelete={(item) => {
				setIsLoading(true);
				setSymbolIds(
					symbolIds.filter((id) => id !== parseInt(item.itemId))
				);
			}}
			onReorder={(items) => {
				setIsLoading(true);
				setSymbolIds(items.map((item) => parseInt(item.itemId)));
			}}
		/>
	);
}
