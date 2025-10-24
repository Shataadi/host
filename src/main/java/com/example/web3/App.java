package com.example.web3;

import io.javalin.Javalin;
import io.javalin.http.Context;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3jService;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

public class App {

    private static Web3j web3;

    public static void main(String[] args) {
        String rpcUrl = getenvOrDefault("ETH_RPC_URL", "https://cloudflare-eth.com");
        int port = Integer.parseInt(getenvOrDefault("PORT", "8080"));

        Web3jService service = new HttpService(rpcUrl);
        web3 = Web3j.build(service);

        Javalin app = Javalin.create(config -> {
            config.staticFiles.add(staticFiles -> {
                staticFiles.hostedPath = "/";
                staticFiles.directory = "public";
                staticFiles.location = io.javalin.http.staticfiles.Location.CLASSPATH;
            });
        });

        app.get("/api/health", App::health);
        app.get("/api/chain", App::chainInfo);
        app.get("/api/balance/{address}", App::balance);

        // Basic CORS for the API endpoints
        app.before(ctx -> {
            ctx.header("Access-Control-Allow-Origin", "*");
            ctx.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            ctx.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        });

        app.start(port);
    }

    private static void health(Context ctx) {
        ctx.json(Map.of("status", "ok"));
    }

    private static void chainInfo(Context ctx) {
        try {
            Web3ClientVersion client = web3.web3ClientVersion().send();
            EthChainId chainId = web3.ethChainId().send();

            Map<String, Object> body = new HashMap<>();
            body.put("clientVersion", client.getWeb3ClientVersion());
            body.put("chainId", chainId.getChainId().toString());
            ctx.json(body);
        } catch (Exception e) {
            ctx.status(500).json(Map.of("error", e.getMessage()));
        }
    }

    private static void balance(Context ctx) {
        String address = ctx.pathParam("address");
        if (address == null || address.isBlank()) {
            ctx.status(400).json(Map.of("error", "address is required"));
            return;
        }
        try {
            EthGetBalance balance = web3.ethGetBalance(address, DefaultBlockParameterName.LATEST).send();
            BigInteger wei = balance.getBalance();
            Map<String, Object> body = new HashMap<>();
            body.put("address", address);
            body.put("wei", wei.toString());
            ctx.json(body);
        } catch (Exception e) {
            ctx.status(500).json(Map.of("error", e.getMessage()));
        }
    }

    private static String getenvOrDefault(String key, String defaultValue) {
        String v = System.getenv(key);
        return v == null || v.isBlank() ? defaultValue : v;
    }
}
