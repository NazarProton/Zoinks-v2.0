const MainContent = () => {
  return (
    <div className="whitepaper-content pc540:w-10/12">
      <p className="text-whiteDark">Updated at 2:35 pm. 25 MAR 2023</p>
      <div className="w-full h-fit"></div>
      <div className="whitepaper-content">
        <h2 id="system-overview">System Overview</h2>
        <p>
          The system offers a universal hedging tool for risk-free investments.
          The system&apos;s financial instruments are BEP-20 standard tokens
          issued on the Binance Smart Chain network.
        </p>
        <p>
          There are <b>2 types of tokens</b> in the system:
        </p>
        <ol>
          <li>
            <b>Zoinks (HZUSD)</b> - an algorithmic token that can be minted at a
            1:1 rate to BUSD using an approriate smart contract, as well as
            liquid pairs traded through HZUSD / BUSD on three DEXs: PancakeSwap,
            ApeSwap and BiSwap. Zoinks price will always tend to be 1 BUSD.
          </li>
          <li>
            <b>Snacks (SNACKS) / etSnacks (ETSNACKS)/ btSnacks (BSNACKS)</b> are
            bond tokens issued and backed by an asset in the form of Zoinks,
            Ethereum and Bitcoin. Each type of Snacks exists as a separate token
            paired with the corresponding token for facilitating two-way
            exchanges within the system. The price of these tokens is floating
            and the price dynamics are regulated based on the principle of a
            linear growth curve.
          </li>
        </ol>
        <p>
          In total, there are <b>4 tokens in the system:</b>
        </p>
        <ol>
          <li>Zoinks, algorithmic token paired with BUSD;</li>
          <li>Snacks, which is bonded to Zoinks;</li>
          <li>etSnacks, which is bonded to Ethereum;</li>
          <li>btSnacks, which is bonded to Bitcoin.</li>
        </ol>
      </div>
      <div className="whitepaper-content">
        <h2 id="initial-header">
          Rate, algorithm and yield structure of Zoinks
        </h2>
        <p>
          Zoinks is an algorithmic token maintained by the system at a rate
          close to 1 to 1 to BUSD
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="second-header">Emission Algorithm</h3>
        <p>
          Time Weighted Average Price (TWAP) – the average price of Zoinks
          across all exchanges paired to BUSD. <br />{' '}
          <b>Recalculation time: 02:00 and 14:00 UTC, daily.</b>
        </p>
        <p>
          TWAP is calculated according to the following formula: <br />
          <b>
            TWAP = (35 * pcsAveragePrice + 15 * apeAveragePrice +
            15*biSwapAveragePrice) / 65
          </b>
        </p>
        <ol>
          <li>
            pcsAveragePrice – weighted average price of Zoinks on PancakeSwap
            over the last 12 hours;
          </li>
          <li>
            apeAveragePrice – weighted average price of Zoinks on ApeSwap over
            the last 12 hours;
          </li>
          <li>
            biSwapAveragePrice – weighted average price of Zoinks on BiSwap over
            the last 12 hours.
          </li>
        </ol>
        <p>
          The system checks the TWAP every 12 hours. If the TWAP &gt;= 1.0001
          then the system triggers an inflation process that is calculated based
          on the inflation reward formula outlined below. In the event of
          inflation, a buffer parameter is introduced to ensure the accuracy of
          calculations. The parameter is currently equal to 5 and may vary
          depending on the exchange rate of HZUSD / BUSD and HZUSD emission
          volumes.
        </p>
        <p>
          Inflationary emissions = (12-hour TWAP - 1) * circulating supply /
          buffer parameter.
        </p>
        <p>The inflationary emission is distributed as follows:</p>
        <ol>
          <li>
            35% reward pool (PancakeSwapPool) to liquidity providers for the
            HZUSD / BUSD pair on PancakeSwap;
          </li>
          <li>
            15% reward pool (ApeSwapPool) to liquidity providers for the HZUSD /
            BUSD pair on ApeSwap;
          </li>
          <li>
            15% reward pool (BiSwapPool) to liquidity providers for the HZUSD /
            BUSD pair on BiSwap;
          </li>
          <li>20% for Seigniorage smart contract;</li>
          <li>
            10% for the mint of Snacks tokens that are sent to an isolated
            address;
          </li>
          <li>
            5% on mint Snacks tokens that are sent to a Pulse smart contract.
          </li>
        </ol>
        <p>
          Maximum possible supply of Zoinks to be minted: <br />
          <b>35 000 000 000 000 (35 trillion).</b>
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="third-header">Minting</h3>
        <p>
          The user can mint Zoinks directly at a 1:1 ratio to BUSD via the
          project website at any time. When a user mints Zoinks using BUSD, the
          contract will issue Zoinks at a 1:1 ratio, and then it will send
          Zoinks to the user&apos;s wallet, and increase the total supply on the
          contract.
        </p>
        <p>
          All BUSDs spent by the user on minting Zoinks are routed to the
          Seigniorage smart contract. In the future, they will be used for
          increasing liquidity in HZUSD / BUSD pairs, minting new Snacks tokens
          and sending them to the Pulse smart contract, as well and other
          purposes. The general purpose will be to stabilize and strengthen the
          system.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="fourth-header">
          Yield structure <br /> Zoinks Farming with LP tokens
        </h3>
        <p>
          Any user can mint Zoinks at a ratio of 1:1 to BUSD or exchange BUSD
          for Zoinks on exchanges such as PancakeSwap, BiSwap and ApeSwap.
        </p>
        <p>
          Users can then add liquidity to the HZUSD / BUSD pair on one of the
          exchanges. In return, the users receive the liquidity tokens (LP
          tokens) of the particular exchange onto their wallets. The users can
          then stake the LP tokens they received in one of the pools such as
          PancakeSwapPool, ApeSwapPool, or BiSwapPool, and receive a reward in
          Zoinks tokens. In the case of PancakeSwapPool, the reward for staking
          will be issued in Zoinks / Snacks / btSnacks / etSnacks tokens.
        </p>
        <p>These pools receive rewards generated by the inflation of Zoinks:</p>
        <ol>
          <li>35% is allocated to the PancakeSwapPool;</li>
          <li>15% is allocated to the ApeSwapPool;</li>
          <li>15% is allocated to the BiSwapPool.</li>
        </ol>
        <p>
          PancakeSwapPool receives 30% from Snacks fees and 20% from btSnacks
          and etSnacks token fees in addition to inflationary rewards.
        </p>
        <p>
          All rewards are accrued and distributed twice daily in proportions
          corresponding to the share of the user&apos;s deposit in the
          respective pool.
        </p>
      </div>

      <div className="whitepaper-content">
        <h2 id="fifth-header">Snacks</h2>
        <p>
          Snacks serves as a bond token for Zoinks. This is a yield bond curve
          token whose yield amount depends on the yield curve – the amount of
          the yield depends on the commissions collected by the system and other
          important factors that form and affect the yield over the accounting
          period.
        </p>
        <p>
          Snacks tokens are issued according to a linear bonding curve. The
          price of each newly minted token is based on the price of the
          previously minted one. The basic concept of a linear bonding curve is
          quite simple. The price of a token is determined by its supply. The
          more tokens are distributed, the higher the price. The regression of
          the price is based on the same mechanism, but in the opposite
          direction – the more tokens are sold to the system (burned), the lower
          the price of the token.
        </p>
        <p>
          The starting price will be 0.000001 Zoinks per 1 Snacks, and the price
          of each consequently created token increases by 0.000001 Zoinks. When
          Snacks are returned to the system, they are burned, and the price of
          each returned Snacks is reduced by 0.000001 Zoinks.
        </p>
        <p>
          Each Snacks token must be backed by Zoinks. This is a requirement of
          the smart contract code. The contract will always have Zoinks to buy
          back Snacks as all Zoinks used to mint Snacks remain in the Snacks
          contract until the Snacks are sold to the system or burned. When an
          investor mints a Snacks, a 5% commission is charged. When an investor
          sells a Snacks, a 10% commission is charged and the Snacks is burned.
          These fees are then distributed throughout the ecosystem. See the Fair
          Commissions on Funds Circulation paragraph for more detailed info on
          the distribution of fees. Remember that Snacks is not a typical asset
          that has its price determined by a liquidity pool. It can only be
          minted with Zoinks.
        </p>{' '}
      </div>
      <div className="whitepaper-content">
        <h3 id="sixth-header">
          Yield Structure <br /> Snacks Yield
        </h3>
        <p>
          Regarding its sources of yield, Snacks is quite interesting, as it has
          both <u>internal profitability</u>, which is formed from the
          commissions of the system, and <u>external profitability</u>, which is
          generated through the reinvestment of Snacks&apos; internal income
          from staking into third-party projects and technologies, thus making
          the system unlimited in terms of performance and focused on external
          profitability.
        </p>
        <p>
          The yield of the token from the growth of its value is also provided
          by the Pulse smart contract – the Snacks eco-subsystem, described
          below, which raises the price floor for selling Snacks into the
          system, thus minimizing the risks of token price collapse.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="find-highlight">Holder rewards (internal profitability)</h3>
        <ol>
          <li>
            15% of commissions collected from the sale/purchase of Snacks;
          </li>
          <li>15% of btSnacks buy/sale commissions collected;</li>
          <li>15% on etSnacks buy/sale commissions collected.</li>
        </ol>
        <p>
          All rewards are accrued and distributed twice daily in proportions
          corresponding to the share of the user&apos;s deposit in the
          respective pool.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="conclusion">
          Snacks Single Staking Pool (Internal profitability)
        </h3>
        <p>
          For tokens deposited for staking, there is an additional yield on top
          of holding assets in the system, a staking reward. This reward is only
          paid to Snacks stakers in all 3 types of Snacks from the respective
          commissions.
        </p>
        <ol>
          <li>15% of the collected commission for the buy/sale of Snacks;</li>
          <li>15% of the collected commission for the buy/sale of btSnacks;</li>
          <li>15% of the collected commission for the buy/sale etSnacks.</li>
        </ol>
        <p>
          All rewards are accrued and distributed twice daily in proportions
          corresponding to the share of the user&apos;s deposit in the
          respective pool for all Single Staking Snacks tokens in addition to
          the holder&apos;s reward described above.
        </p>
      </div>

      <div className="whitepaper-content">
        <h2 id="seventh-header">The Risk-Free LunchBox Subsystem</h2>
        <p>
          This is an additional opportunity for growth and full risk reduction
          for stakers of Snacks tokens. Simple staking rewards can be deposited
          into the LunchBox pool to allow them to grow even further. In this
          case, SnacksPool staking rewards will be converted into Zoinks on the
          PancakeSwap exchange, these Zoinks will be converted into BUSD, and
          the BUSD will be reinvested into a specially configured GridBot on the
          exchange. The bot multiplies the assets it trades and receives an
          income. This income will be collected twice daily, converted to BUSD,
          and then converted to Zoinks, after which the Snacks tokens will be
          minted and transferred to the holder&apos;s account.
        </p>
        <p>
          Funds transferred to LunchBox - the user&apos;s income from simple
          staking - are accounted entirely, but are not refundable. They are
          permanently deposited into the system against the yield from LunchBox.
        </p>
        <p>
          All rewards are accrued and distributed twice daily in proportions
          corresponding to the share of the user&apos;s deposit in the
          respective pool.
        </p>
      </div>
      <div className="whitepaper-content">
        <h2 id="eighth-header">btSnacks and ethSnacks</h2>
        <p>
          btSnacks / etSnacks are bond tokens for BTC / ETH. These are yield
          tokens that depend on the yield bond curve, as the amount of income
          depends on the commissions collected by the system and other important
          factors that form and affect yield for the reporting period.
        </p>
        <p>
          btSnacks / etSnacks tokens are issued based on a linear bond curve.
          The price of each newly minted token is pegged to the price of the
          previously minted token. The basic concept of a linear bond curve is
          quite simple – the price of a token is determined by its supply. The
          more tokens are distributed, the higher the price. The price
          regression is based on the same mechanism, but acts in the opposite
          direction – the more tokens are sold to the system (burned), the lower
          the price of the token.
        </p>
        <p>
          The starting price will be 0.00000001 BTC / ETH per btSnacks /
          etSnacks, and the price of each consequently minted token increases by
          0.00000001 BTC / ETH. When btSnacks / etSnacks are returned to the
          system, they are burned, and the price of each returned token is
          reduced by 0.00000001 BTC / ETH.
        </p>
        <p>
          Each btSnacks / etSnacks token must be backed by BTC / ETH. This is a
          requirement of the smart contract code. The contract will always have
          BTC / ETH for buying back the tokens, since all BTC / ETH used to mint
          btSnacks / etSnacks remain in the btSnacks / etSnacks token contract
          until they are sold to the system and burned. When an investor mints
          btSnacks / etSnacks, a 5% fee is charged. When an investor sells
          btSnacks / etSnacks, a 10% commission is charged and btSnacks /
          etSnacks are burned. These fees are then distributed throughout the
          ecosystem. See the Fair Commissions on Funds Circulation paragraph for
          more information.
        </p>
        <p>
          <b>
            Remember that btSnacks / etSnacks are not typical assets that are
            priced by liquidity pools. They can only be minted with BTC / ETH.
          </b>
        </p>{' '}
      </div>
      <div className="whitepaper-content">
        <h3 id="nineth-header">
          Yield Structure <br /> Profitability of btSnacks / etSnacks
        </h3>
        <p>
          Regarding their profitability, btSnacks / etSnacks are tokens for
          storing and hedging the risks of the volatility of the currencies they
          are converted into. They only feature an internal profitability, which
          is formed from the commission of the system.
        </p>
        <p>
          Also, the yield of the token from the growth of its value is provided
          by the Pulse smart contract, which is the btSnacks / etSnacks
          eco-subsystem described below, that raises the floor price for selling
          btSnacks / etSnacks into the system, thus minimizing the risks of
          token price collapse.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="tenth-header">Holder rewards (internal profitability)</h3>
        <p>
          15% of btSnacks / etSnacks buy/sale commissions collected,
          <br />
          All rewards are accrued and distributed twice daily in proportions
          corresponding to the share of the user&apos;s deposit in the
          respective pool.
        </p>
      </div>

      <div className="whitepaper-content">
        <h2 id="pulse-header">Pulse Subsystem</h2>
        <p>
          Pulse is a separate smart contract that participates in staking on
          PancakeSwapPool and SnacksPool. Once every 12 hours, the contract will
          collect all the rewards. The funds held on the contract are the
          rewards the smart contract receives from the commissions in the system
          and the inflationary emissions. More details on these sources can be
          found in the Fair Commissions on Funds Circulation and Emission
          Algorithm (Zoinks) sections. The contract, like a regular user, also
          receives all the rewards from farming, staking and holding, and assets
          attributed to it. The contract will hold 50% of the collected btSnacks
          and etSnacks, and it will send 50% to the Seigniorage smart contract.
        </p>
        <p>
          <b>
            IMPORTANT: <br /> ALL LP tokens staked by the Pulse smart contract
            in the PancakeSwapPool, as well as all Snacks tokens staked in the
            SnacksPool will be permanently locked and cannot be withdrawn. We
            must be able to increase the size of the deposit from time to time,
            but never withdraw any funds.
          </b>
        </p>
        <p>
          Once every 12 hours, the contract will take up 10% of the available
          Zoinks and mint Snacks, as well as stake the LP tokens received from
          the Seigniorage contract in PancakeSwapPool. At the same time, it will
          take up 10% of all currently available Snacks and redeem them to
          Zoinks. It will also take up 10% of Snacks and place them in the
          SnacksPool.
        </p>
        <p>
          <b>Example.</b> <br /> Suppose the contract currently contains 1,000
          Zoinks, 1,000 Snacks and 1,000 Pancake LPs:
        </p>
        <ul>
          <li>The contract will withdraw 100 Snacks back to Zoinks</li>
          <li>The contract will transfer 100 Snacks to the SnacksPool.</li>
          <li>The contract will mint Snacks tokens for 100 Zoinks.</li>
        </ul>
        <p>
          Unauthorized wallets will not be able to use the contract. Only
          whitelisted wallets will be able to use the contract, including the
          deposit, transfer, and other features.
        </p>
        <p>
          The main page will display a countdown to the next impulse and the
          dollar amount of the next impulse.
        </p>
        <p>
          Time to next impulse: <br />
          Dollar amount (equal to 10% of the cost of Zoinks + 20% of the cost of
          Snacks that are in the contract).
        </p>
      </div>
      <div className="whitepaper-content">
        <h2 id="circulation-header">
          Fair Commissions on Funds Circulation. Restrictions and limitations
        </h2>
        <p>
          <b>
            PancakeSwapPool, BiSwapPool and ApeSwapPool all charge fair
            withdrawal fees:
          </b>{' '}
          <br />
          If a certain number of staked LP tokens are withdrawn before the
          expiration of 24 hours, then a commission of 50% of the withdrawn
          amount will be charged to the Seigniorage smart contract.
          <br />
          If any amount of staked LP tokens is withdrawn after 24 hours, a fee
          of 10% of the withdrawn amount is applied and paid to the Seigniorage
          smart contract.
        </p>
        <p>
          <b>SnacksPool charges a fair withdrawal fee:</b> <br />
          If any staked Snacks tokens are withdrawn before the expiration of 24
          hours, a fee of 50% of the withdrawn amount will be paid to the
          Seigniorage smart contract.
        </p>
        <p>
          As for LunchBox, termination of the contract is only possible after 24
          hours have passed since its activation.
        </p>
        <p>
          A 10% commission is charged from all rewards in the system before they
          are credited and distributed.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="commission-header">Commission Distribution</h3>
        <p>All commissions collected are distributed as follows:</p>
        <h4 id="circulation-snacks-header">Snacks (Redeem and Mint):</h4>
        <ol>
          <li>
            {' '}
            35% of the fees will be directed to the Pulse smart contract;
          </li>
          <li>
            30% of the fees will be directed to the PancakeSwapPool smart
            contract;
          </li>
          <li>
            15% of the fees will be directed towards the SnacksPool smart
            contract;
          </li>
          <li>15% of the fees will be directed to holders;</li>
          <li>
            5% of the fees will be directed to the Seigniorage smart contract.
          </li>
        </ol>
        <p>
          <b>Example:</b>
          <br />
          5,000 minted Snacks are subject to a 5% tax.
        </p>
        <ul>
          <li>The user will receive 4,750 Snacks sent to their wallet.</li>
          <li> The user will receive 4,750 Snacks sent to their wallet.</li>
        </ul>
        <h4 id="btcSnacks-ethSnacks">
          btcSnacks / ethSnacks (Redeem and Mint):
        </h4>
        <ol>
          <li>15% of the fees will be directed to the Pulse smart contract;</li>
          <li>
            20% of the fees will be directed to the PancakeSwapPool smart
            contract;
          </li>
          <li>
            15% of the fees will be directed to the SnacksPool smart contract;
          </li>
          <li>
            20% of the fees will be directed to btSnacks / etSnacks holders;
          </li>
          <li>15% of the fees will be directed to Snacks holders;</li>
          <li>
            15% of the fees will be directed to the Seigniorage smart contract.
          </li>
        </ol>
        <p>
          <b>Example:</b>
          <br />
          5,000 btSnacks are subject to a 5% tax.
        </p>
        <ul>
          <li>The user will receive 4,750 btSnacks sent to their wallet.</li>
          <li>
            The remaining 250 btSnacks are distributed as described above.
          </li>
        </ul>
      </div>

      <div className="whitepaper-content">
        <h2 id="tocenomics-heading">Project Tokenomics</h2>
      </div>
      <div className="whitepaper-content">
        <h3 id="revenues-heading">User revenues</h3>
        <p>
          The profits of the system users are formed from internal and external
          sources, the internal ones are shares of the collected system
          commissions while the external ones are shares of the system earnings
          from outside, for example - the LunchBox subsystem, whose profits are
          formed from the results of grid bot trading on the exchange, those
          profits come into the system from a third party exchange account and
          are distributed between the subsystem investors (see more about the
          distribution of commissions in the paragraph &quot;Risk-free LunchBox
          subsystem&quot;). Further development of the project is focused on the
          maximum development of sustainable sources of income.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="sourses-header">Users&apos; revenue from internal sources</h3>
        <p>
          The following users profit from the internal sources in the system:
        </p>
        <ul>
          <li>Zoinks/BUSD liquidity holders;</li>
          <li>holders of Snacks, btSnacks, etSnacks;</li>
          <li>Snacks stakers.</li>
        </ul>
      </div>
      <div className="whitepaper-content">
        <h3 id="liquidity-header">Liquidity Holders</h3>
        <p>These users receive 2 types of rewards:</p>
        <ol>
          <li>
            <b>All liquidity holders receive rewards from Zoinks inflation</b>
            <ul>
              <li>35% goes to the PancakeSwapPool;</li>
              <li>15% goes to ApeSwapPool;</li>
              <li>15% goes to BiSwapPool.</li>
            </ul>
          </li>
          <br />
          <li>
            <b>
              Additional reward from system commissions - ONLY liquidity holders
              on PancakeSwap
            </b>
            <ul>
              <li>30% of Snacks commission fees;</li>
              <li>20% of bt/etSnacks commission fees;</li>
            </ul>
          </li>
        </ol>
        <p>
          Rewards are credited to the holder but must be claimed using the
          Liquidity section at the system&apos;s website. <br /> Rewards are not
          distributed on an equal basis, but in reference to the share of the
          user&apos;s liquidity tokens in the overall pool of liquidity tokens.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="snacks-holders-rewards">
          Snacks holders, btSnacks holders, etSnacks holders:
        </h3>
        <p>Snacks holders receive 2 types of rewards:</p>
        <ul>
          <li>15% of Snacks commission fees;</li>
          <li>15% of bt/etSnacks commission fees;</li>
        </ul>
        <p>Holders of bt/etSnacks receive rewards from:</p>
        <ul>
          <li>
            20% of the commission fees of the token they hold (if btSnacks, from
            the fees of btSnacks, if etSnacks, from the fees of etSnacks).
          </li>
        </ul>
        <p>
          With all three or two of the three tokens, holders receive commissions
          as described above for each token separately.
        </p>
        <p>
          Native token rewards do not need to be claimed, but are awarded
          automatically (if a Snacks holder receives Snacks, their wallet
          deposit increases as rewards are awarded, but when they receive
          bt/etSnacks - they are awarded in their favor, but must be claimed
          using the holding block on the system website).
        </p>
        <p>
          Rewards are not distributed on an equal basis, but in reference to the
          share of the user&apos;s tokens in the total pool of tokens.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="snacks-stakers-header">Snacks Stakers</h3>
        <p>Snacks Stakers receive 2 types of rewards:</p>
        <ul>
          <li>15% of Snacks commission fees;</li>
          <li>15% of bt/etSnacks commission fees.</li>
        </ul>
        <p>
          Staking rewards do not override the holder&apos;s rewards, but will be
          added to them if the holder has activated the staking pool. <br />{' '}
          When the staking pool is activated, the holder&apos;s rewards
          automatically top up the staking deposit..
        </p>
        <p>
          Rewards are credited to the staker, but must be claimed using the
          Snacks Staking section on the system&apos;s website. <br />
          Rewards are not distributed in an equal basis, but in reference to the
          share of the user&apos;s tokens in the total pool of tokens.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="reevnues-eternal-header">
          User revenue from external sources:
        </h3>
        <p>
          The LunchBox subsystem is an external source of profit for the system.
          If a deposit is activated in the specified system, the user receives
          rewards:
        </p>
        <ul>
          <li>
            a percentage of the total pool of rewards equal to the percentage
            from the stakers share of the LunchBox pool.
          </li>
        </ul>
        <p>
          In case of LunchBox activation, the holder&apos;s rewards are
          automatically added to the staking deposit{' '}
          <b>(!!! not the LunchBox deposit !!!)</b>. <br /> For more details,
          see the paragraph{' '}
          <span className="text-cyan">
            <a href="#seventh-header">&quot;Risk-free LunchBox system&quot;</a>
          </span>
          .
        </p>
        <p>
          Rewards are credited to the staker, but have to be claimed using the
          Snacks staking block on the system&apos;s website. <br />
          Rewards are not distributed on an equal basis, but in reference to the
          share of the user&apos;s tokens in the total pool of tokens.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="floor-price-header">
          The minimal possible value of tokens and &quot;Freezing&quot; of
          tokens:
        </h3>
        <p>
          The minimum possible value of tokens is the amount of tokens that
          neither users nor holders can withdraw from the system.
        </p>
        <p>
          This feature of the system guarantees that the users&apos; investments
          are secured with liquid assets and that a break-even exists for the
          vast majority of crisis scenarios, should they occur.
        </p>
        <p>
          The minimal possible token value is applied to all types of Snacks and
          is reflected in the corresponding liquid assets that secure the
          corresponding Snacks type.
        </p>
        <p>
          The said assets are &quot;frozen&quot; on the smart contracts and
          cannot be withdrawn from the system neither by the users nor by the
          managers of the system. &quot;Freezing&quot; always leaves tokens in
          the system contracts that it affects as so as marketable assets with
          which the system&apos;s liabilities on those tokens are covered.
        </p>
        <p>
          This results in a natural surplus effect on the system and guarantees
          its ability to cover its obligations to users.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="floor-tockens-header">
          Formation of the minimal possible value of Snacks tokens:
        </h3>
        <p>
          The minimal possible value of Snacks is formed due to several
          mechanisms in the system:
        </p>
        <ul>
          <li>
            Inflation of Zoinks - with inflationary emission, 10% of the Zoinks
            are used to create Snacks. Snacks created in this way are sent to
            the zero - &quot;dead&quot; Snacks contract address. These Snacks
            can no longer be withdrawn from circulation and the Zoinks backing
            those Snacks remain on the Snacks contract forever.
          </li>
          <li>
            PULSE subsystem functioning - each time it operates, PULSE places
            10% of its Snacks deposit into the Snacks staking. The PULSE cannot
            withdraw the placed tokens from the staking, but only profits on
            them like an ordinary user. The Snacks sent by the system to the
            staking remain permanently on the staking contract, and the Zoinks
            securing them are permanently &quot;frozen&quot; on the Snacks
            contract in their collateral.
          </li>
        </ul>
        <p>
          Every time it operates, PULSE keeps 50% of the incoming bt/etSnacks on
          deposit, they remain there forever, and the BTC/ETH securing them are
          always &quot;frozen&quot; on the bt/etSnacks contracts in their
          collateral.
        </p>
      </div>
      <div className="whitepaper-content">
        <h3 id="therefore-header">Therefore</h3>
        <p>
          <b>&quot;Freezing&quot;</b>, as a burning mechanism, affects all
          tokens in the system, without exception:
        </p>
        <ul>
          <li>
            Zoinks are &quot;frozen&quot; irrevocably in an amount equal to 10%
            of each inflationary emission of Zoinks, and 10% of the value of the
            corresponding Snacks deposit of the PULSE subsystem;
          </li>
          <li>
            Snacks are &quot;frozen&quot; irrevocably in an amount equal to 10%
            of each Zoinks inflationary issue, 10% of the value of the
            corresponding Snacks deposit of the PULSE subsystem;
          </li>
          <li>
            bt/etSnacks - &quot;frozen&quot; irrevocably in an amount equal to
            50% of the corresponding bt/etSnacks deposited to the PULSE
            subsystem;
          </li>
          <li>
            BTC/ETH are &quot;frozen&quot; irrevocably in an amount equal to 50%
            of the corresponding bt/etSnacks value of the PULSE system deposit.
          </li>
        </ul>
        <p>
          <b>The minimal possible value of Snacks tokens</b> is formed by the
          sum of &quot;frozen&quot; collateral tokens and is equal to the sum of
          all Snacks that can be created from the first Snack to the last Snack
          that can be created with frozen assets.
        </p>
        <p>
          The minimum possible value of tokens and the Sum of Frozen Assets are
          constantly growing dynamic values. Constant growth is ensured by the
          activity of the PULSE subsystem, which replenishes and works out 2
          times during a UTC day regardless of user activity.
        </p>
      </div>

      <div className="whitepaper-content">
        <h2 id="profit-header">The profit of the system and Seigniorage</h2>
        <p>
          The profits of the system and the distribution of incoming user funds
          are managed by the Seigniorage contract. Assets that come into the
          contract are conditionally divided into two pools - BUSD (pool 2) and
          all other currencies (pool 1).
        </p>
        <p>
          <b>
            Funds flow into Seigniorage from several sources in a different
            currencies:
          </b>
        </p>
        <ul>
          <li>Zoinks creation &rarr; BUSD;</li>
          <li>commission from the creation of Snack &rarr; Snack;</li>
          <li>commission from the creation of btStack &rarr; btSnack;</li>
          <li>commission from the creation of etStack &rarr; etSnack;</li>
          <li>commission from the sale of btStack &rarr; btSnack;</li>
          <li>commission from the sale of etStack &rarr; etSnack;</li>
          <li>
            commission from all awards &rarr; BUSD, Snack, btSnack, etSnack,
            Zoinks;
          </li>
          <li>commission for broken liquidity pair &rarr; Zoinks LP;</li>
          <li>early withdrawal fee &rarr; Zoinks LP;</li>
          <li>early withdrawal penalties &rarr; Snacks;</li>
        </ul>
        <p>
          <b>
            There are several accumulation funds with different objectives in
            the system:
          </b>
        </p>
        <ul>
          <li>
            The system&apos;s reserve fund. <br /> Placed on the system&apos;s
            exchange account, which is linked to the LunchBox by a contract.
            During normal operation of the system, it provides additional income
            to the users of the LunchBox subsystem. In the case of a crisis
            situation, it is withdrawn and used to cover liabilities of the
            system to the users.
          </li>
          <li>
            The system&apos;s situational fund.
            <br /> Partially placed in the system&apos;s exchange account that
            is linked with the LunchBox contract. The fund is used to cover
            exchange rate fluctuations on exchanges, to strengthen the reserve
            fund and to cover possible system unforeseen situations.
          </li>
          <li>
            Technical development fund of the system.
            <br /> Used to cover technical costs and technical development of
            the system.
          </li>
          <li>
            System marketing development fund.
            <br /> This fund is used to cover marketing expenses.
          </li>
          <li>
            System founders&apos; profit.
            <br /> Forms the income of the system founders.
          </li>
        </ul>
        <p>
          The Seigniorage contract distributes the funds received into the
          system as follows
          <br />
          <b>Pool 2, BUSD:</b>
        </p>
        <ul>
          <li>2% creates btSnack and sends to Pool 1;</li>
          <li>2% creates etSnack and sends to Pool 1;</li>
          <li>2% creates btSnack and sends to PULSE;</li>
          <li>2% creates etSnack and sends to PULSE;</li>
          <li>25% creates LP and sends to PULSE;</li>
          <li>
            45% is placed in the reserve fund and sent to LunchBox (see the
            paragraph{' '}
            <span className="text-cyan">
              <a href="#seventh-header">
                &quot;Risk-free LunchBox system&quot;
              </a>
            </span>{' '}
            for more details);
          </li>
          <li>
            - 20% remains in the Zoinks security in a separate wallet and/or is
            used for the intended purpose of the situational fund;
          </li>
          <li>2% creates snacks and is sent to PULSE.</li>
        </ul>
        <p>
          <b>Pool 1, other currencies:</b>
        </p>
        <ul>
          <li>5% BDO interest;</li>
          <li>5% CRO interest;</li>
          <li>5% CTO interest;</li>
          <li>5% CMO interest;</li>
          <li>
            10% accounted for the system&apos;s technical development fund;
          </li>
          <li>
            20% accounted for the system&apos;s marketing development fund;
          </li>
          <li>
            35% accounted for the reserve fund and sent to LunchBox (for more
            details, see the paragraph{' '}
            <span className="text-cyan">
              <a href="#seventh-header">
                &quot;Risk-free LunchBox system&quot;
              </a>
            </span>
            );
          </li>
          <li>15% goes to the system&apos;s situational fund;</li>
        </ul>
      </div>
      <div className="whitepaper-content">
        <h2 id="funds-header">Depositing and Withdrawing Funds</h2>
        <p>
          Funds are deposited into the system by exchanging users&apos; BUSD
          into the system&apos;s basic token, Zoinks. Zoinks can be obtained by
          direct creation on the system&apos;s website or by exchanging in the
          corresponding liquid pair on exchanges:
        </p>
        <ul>
          <li>Pancake Swap;</li>
          <li>BiSwap;</li>
          <li>ApeSwap;</li>
        </ul>
        <p>
          Withdrawal of funds from the system is performed by exchanging Zoinks
          to BUSD in the corresponding liquid pair at the exchanges:
        </p>
        <ul>
          <li>Pancake Swap;</li>
          <li>BiSwap;</li>
          <li>ApeSwap;</li>
        </ul>
      </div>
    </div>
  );
};

export default MainContent;
