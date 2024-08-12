import { useDecks } from '@/hooks'
import { useAppStore } from '@/store'
import { FormattedDeck } from '@/utils/types'
import { DeckCard } from './deck-card'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

export function DeckListPage() {
  const deckResp = useDecks()

  const testMode = useAppStore((state) => state.isTestMode)
  const setTestMode = useAppStore((state) => state.setIsTestMode)

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Decks</h1>
          <div className="flex items-center space-x-2">
            <Switch id="test-mode" checked={testMode} onCheckedChange={setTestMode} />
            <Label htmlFor="test-mode">Test Mode</Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {deckResp.isPending || (deckResp.data && deckResp.data.length > 0) ? (
            deckResp.data.map((deck) => (
              <DeckCard
                key={deck.id}
                deck={deck as unknown as FormattedDeck}
                onAddCard={async () => {
                  await deckResp.refetch()
                }}
              />
            ))
          ) : (
            <div className="border-2 border-dashed border-gray-300 h-[232px] rounded-lg p-6 flex items-center">
              <div className="text-center w-full flex flex-col gap-1">
                <p className="text-base font-medium text-gray-700">No decks yet</p>
                <p className="text-sm text-gray-600">
                  Please click right top button to create a new deck.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
