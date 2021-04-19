package main

import (
	"bytes"	
	"crypto/ecdsa"
	"encoding/binary"
	"encoding/hex"
	"errors"
	"fmt"

	"github.com/ethersphere/bee/pkg/bzz"
	"github.com/ethersphere/bee/pkg/crypto"
	"github.com/ethersphere/bee/pkg/swarm"

	ma "github.com/multiformats/go-multiaddr"

	"golang.org/x/crypto/sha3"
)

var ErrInvalidAddress = errors.New("invalid address")

func generateSignData(underlay, overlay []byte, networkID uint64) []byte {
	networkIDBytes := make([]byte, 8)
	binary.BigEndian.PutUint64(networkIDBytes, networkID)
	signData := append([]byte("bee-handshake-"), underlay...)
	signData = append(signData, overlay...)
	return append(signData, networkIDBytes...)
}

func NewOverlayFromEthereumAddress(ethAddr []byte, networkID uint64) swarm.Address {
	netIDBytes := make([]byte, 8)
	binary.LittleEndian.PutUint64(netIDBytes, networkID)
	h := sha3.Sum256(append(ethAddr, netIDBytes...))
	fmt.Println("buffer", append(ethAddr, netIDBytes...))
	fmt.Println("sha3", h)
	return swarm.NewAddress(h[:])
}

func NewOverlayAddress(p ecdsa.PublicKey, networkID uint64) (swarm.Address, error) {
	ethAddr, err := crypto.NewEthereumAddress(p)
	fmt.Println("ethAddr", ethAddr, err)
	if err != nil {
		return swarm.ZeroAddress, err
	}
	return NewOverlayFromEthereumAddress(ethAddr, networkID), nil
}

func ParseAddress(underlay, overlay, signature []byte, networkID uint64) (*bzz.Address, error) {
	recoveredPK, err := crypto.Recover(signature, generateSignData(underlay, overlay, networkID))
	if err != nil {
		fmt.Println("Cannot recover")
		return nil, ErrInvalidAddress
	}

	recoveredOverlay, err := NewOverlayAddress(*recoveredPK, networkID)
	if err != nil {
		fmt.Println("Cannot create new overlay address")
		return nil, ErrInvalidAddress
	}
	if !bytes.Equal(recoveredOverlay.Bytes(), overlay) {
		fmt.Println("Overlay addresses don't match")
		fmt.Println("recoveredOverlay", recoveredOverlay, recoveredOverlay.Bytes())
		return nil, ErrInvalidAddress
	}

	multiUnderlay, err := ma.NewMultiaddrBytes(underlay)
	if err != nil {
		fmt.Println("Cannot create new multi address")
		return nil, ErrInvalidAddress
	}

	return &bzz.Address{
		Underlay:  multiUnderlay,
		Overlay:   swarm.NewAddress(overlay),
		Signature: signature,
	}, nil
}

func main() {
	underlay, _ := hex.DecodeString("047f000001060662a5032700250802122103588aaadfe7470e4d801af7c2cfacc33ae9b288636593d3196a6314aea1dbcebd")
	overlay, _ := hex.DecodeString("16dc396069dbd4f9a0bd1b6206e4f193b5691edd54f8b1db51cc26ebc40f2574")
	signature, _ := hex.DecodeString("5f7c2506940c004a3cf86ce5da3908417fa0d4727fbd8e73a1253b55fcaac2f03d0e52e6108c6e5bb621de7bcd542352867baf6aa9acb7f9e587dd11328e3a861b")

	signData := generateSignData(underlay, overlay, 1)

	fmt.Println("underlay", underlay)
	fmt.Println("overlay", overlay)
	fmt.Println("signData", signData)
	fmt.Println()

	fmt.Println(ParseAddress(underlay, overlay, signature, 1))
}
