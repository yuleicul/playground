import { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

export async function GET(_req: NextRequest, res: NextApiResponse) {
  console.log('enter api/retrieval')

  // Load
  const loader = new TextLoader('public/help.md')
  const docs = await loader.load()

  // Split
  // https://js.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/code_splitter
  const splitter = RecursiveCharacterTextSplitter.fromLanguage('markdown', {
    chunkSize: 500,
    chunkOverlap: 0,
  })
  const docOutput = await splitter.splitDocuments(docs)

  // Embed and store
  // https://js.langchain.com/docs/modules/data_connection/vectorstores/
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docOutput,
    new OpenAIEmbeddings()
  )
  console.log('hello')

  // Initialize a retriever wrapper around the vector store
  // https://js.langchain.com/docs/modules/data_connection/retrievers/
  const vectorStoreRetriever = vectorStore.asRetriever()

  console.log('vectorStoreRetriever', vectorStoreRetriever)

  res.json(vectorStoreRetriever)
}
