package main

import (
    "context"
    "fmt"
		"math/big"
		"os"

    "github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	blockNumber, _ := new(big.Int).SetString(os.Args[1], 10)
	ctx := context.Background()
	client, _ := ethclient.Dial("https://rpc.xdaichain.com/")
	blockHeader, _ := client.HeaderByNumber(ctx, blockNumber)

	fmt.Printf("%x", blockHeader.Hash())
}
